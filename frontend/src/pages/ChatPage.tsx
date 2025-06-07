import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const personalities: { [key: string]: { name: string; description: string; avatar: string } } = {
  // Physics
  einstein: {
    name: "Albert Einstein",
    description: "Theoretical physicist known for the theory of relativity",
    avatar: "👨‍🔬"
  },
  newton: {
    name: "Isaac Newton",
    description: "Father of classical mechanics",
    avatar: "🍎"
  },
  feynman: {
    name: "Richard Feynman",
    description: "Famous for his work in quantum mechanics and QED",
    avatar: "🌀"
  },

  // Chemistry
  curie: {
    name: "Marie Curie",
    description: "Pioneer in radioactivity",
    avatar: "⚗️"
  },
  mendeleev: {
    name: "Dmitri Mendeleev",
    description: "Creator of the periodic table",
    avatar: "📊"
  },
  pauling: {
    name: "Linus Pauling",
    description: "Chemist and peace activist",
    avatar: "🧪"
  },

  // Mathematics
  euclid: {
    name: "Euclid",
    description: "Father of geometry",
    avatar: "📐"
  },
  gauss: {
    name: "Carl Gauss",
    description: "Prince of mathematicians",
    avatar: "📈"
  },
  lovelace: {
    name: "Ada Lovelace",
    description: "First computer programmer",
    avatar: "💻"
  },

  // Biology
  darwin: {
    name: "Charles Darwin",
    description: "Father of evolution",
    avatar: "🐦"
  },
  franklin: {
    name: "Rosalind Franklin",
    description: "Key contributor to DNA discovery",
    avatar: "🧬"
  },
  mendel: {
    name: "Gregor Mendel",
    description: "Father of genetics",
    avatar: "🌱"
  },

  // Astronomy
  galileo: {
    name: "Galileo Galilei",
    description: "Astronomer and physicist",
    avatar: "🔭"
  },
  sagan: {
    name: "Carl Sagan",
    description: "Popularized astronomy",
    avatar: "🌌"
  },
  rubin: {
    name: "Vera Rubin",
    description: "Dark matter pioneer",
    avatar: "🌠"
  },

  // Engineering
  tesla: {
    name: "Nikola Tesla",
    description: "Inventor and electrical engineer",
    avatar: "⚡️"
  },
  brunel: {
    name: "Isambard Kingdom Brunel",
    description: "Famous civil engineer",
    avatar: "🛤️"
  },
  lamarr: {
    name: "Hedy Lamarr",
    description: "Inventor and actress, co-invented frequency hopping",
    avatar: "📡"
  },

  // Computer Science
  turing: {
    name: "Alan Turing",
    description: "Father of computer science and AI",
    avatar: "🧠"
  },
  hopper: {
    name: "Grace Hopper",
    description: "Pioneer of computer programming",
    avatar: "🖥️"
  },
  knuth: {
    name: "Donald Knuth",
    description: "Father of algorithm analysis",
    avatar: "📘"
  },

  // History
  herodotus: {
    name: "Herodotus",
    description: "Ancient Greek historian",
    avatar: "📜"
  },
  zinn: {
    name: "Howard Zinn",
    description: "Historian and social activist",
    avatar: "🏛️"
  },
  beard: {
    name: "Mary Beard",
    description: "Classical historian and author",
    avatar: "🏺"
  },

  // Philosophy
  socrates: {
    name: "Socrates",
    description: "Classical Greek philosopher",
    avatar: "🤔"
  },
  beauvoir: {
    name: "Simone de Beauvoir",
    description: "Existentialist philosopher and feminist",
    avatar: "📚"
  },
  nietzsche: {
    name: "Friedrich Nietzsche",
    description: "Philosopher, cultural critic, poet",
    avatar: "🦅"
  }
};

const ChatPage = () => {
  const navigate = useNavigate();
  const { person } = useParams<{ person: string }>();
  const character = personalities[person || "einstein"] || personalities["einstein"];

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        character_id: characterId,
        question: question,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "API error");
    }

    const data = await res.json();
    return data.answer;
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

    try {
      const answer = await askBackend("user-123", person || "einstein", inputMessage);

      const aiMessage: Message = {
        id: messages.length + 2,
        text: answer,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, something went wrong while contacting the AI.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-gray-900 rounded-full relative">
              <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About us</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          Log in
        </Button>
      </nav>

      {/* Video Section */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 mb-4">*VIDEO WITH FACE MOVING</p>
        <div className="w-80 h-80 mx-auto bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-8xl">{character.avatar}</div>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4">{character.description}</p>
        <p className="text-xs text-gray-500">*FUN FACT GENERATED</p>
      </div>

      {/* Chat Section */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-8">{character.name}</h2>

        {/* Messages */}
        <div className="flex-1 mb-6 space-y-4 overflow-y-auto max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-700 text-white rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Voice Over API Notice */}
        <p className="text-center text-sm text-gray-400 mb-4">*VOICE OVER (API)</p>

        {/* Message Input */}
        <div className="flex gap-3 mb-6">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
