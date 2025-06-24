import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import CharacterAnimation from "@/components/CharacterAnimation";

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// ... personalities definition stays unchanged ...

const getUserId = () => {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = "user-" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("user_id", id);
  }
  return id;
};

const renderMessageWithMath = (text: string) => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\])/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('$$') || part.startsWith('\\[')) {
      const content = part.replace(/^\$\$|^\[|\\\[|\\\]|\$\$$/g, '');
      return <BlockMath key={index}>{content}</BlockMath>;
    }
    if (part.startsWith('$')) {
      const content = part.replace(/^\$|\$$/g, '');
      return <InlineMath key={index}>{content}</InlineMath>;
    }
    return <span key={index}>{part}</span>;
  });
};

const ChatPage = () => {
  const { person } = useParams<{ person: string }>();
  const characterKey = person || "einstein";
  const character = personalities[characterKey] || personalities["einstein"];

  const [animationStatus, setAnimationStatus] = useState<"blinking" | "listening" | "talking">("blinking");

  const randomFact = useMemo(() => {
    const facts = character.funFacts || [];
    return facts.length > 0 ? facts[Math.floor(Math.random() * facts.length)] : "No fun facts available.";
  }, [character]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi, I am ${character.name}, how can I help?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const askBackend = async (userId: string, characterId: string, question: string) => {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, character_id: characterId, question })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "API error");
    }

    const data = await res.json();
    return data.answer;
  };

  const simulateTyping = (fullText: string) => {
    const id = messages.length + 2;
    setMessages(prev => [...prev, { id, text: "", isUser: false, timestamp: new Date() }]);

    let index = 0;
    let currentText = "";

    const interval = setInterval(() => {
      currentText += fullText[index];
      index++;
      setMessages(prev =>
        prev.map(m => m.id === id ? { ...m, text: currentText } : m)
      );
      if (index >= fullText.length) {
        clearInterval(interval);
        setAnimationStatus("blinking");
      }
    }, 20);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setAnimationStatus("talking");

    try {
      const userId = getUserId();
      const answer = await askBackend(userId, characterKey, inputMessage);
      simulateTyping(answer);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Sorry, something went wrong while contacting the AI.",
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setAnimationStatus("blinking");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col animate-fade-in">
      <NavBar />

      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 mb-4">*VIDEO WITH FACE MOVING</p>
        <div className="w-80 h-80 mx-auto bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700 flex items-center justify-center">
          <CharacterAnimation character={characterKey} status={animationStatus} />
        </div>
        <p className="text-sm text-gray-400 mt-4">{character.description}</p>
        <p className="text-sm text-gray-300 italic mt-2">🌟 Fun fact: {randomFact}</p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-8">{character.name}</h2>

        <div className="flex-1 mb-6 space-y-4 overflow-y-auto max-h-96">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isUser ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-700 text-white rounded-bl-sm'
              }`}>
                <div className="text-sm whitespace-pre-wrap">
                  {renderMessageWithMath(message.text)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mb-4">*VOICE OVER (API)</p>

        <div className="flex gap-3 mb-6">
          <Input
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              setAnimationStatus("listening");
            }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
