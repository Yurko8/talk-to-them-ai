
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
  "albert-einstein": {
    name: "Albert Einstein",
    description: "Theoretical physicist known for the theory of relativity",
    avatar: "👨‍🔬"
  }
};

const ChatPage = () => {
  const navigate = useNavigate();
  const { person } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Albert Einstein. I'm delighted to discuss the mysteries of the universe with you. What would you like to explore today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const personality = personalities[person || ""] || personalities["albert-einstein"];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: "That's a fascinating question! In my experience, the most beautiful thing we can experience is the mysterious. It's the source of all true art and science.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage("");
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
            <div className="text-8xl">{personality.avatar}</div>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4">Albert Einstein created cocaine</p>
        <p className="text-xs text-gray-500">*FUN FACT GENERATED</p>
      </div>

      {/* Chat Section */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-8">{personality.name}</h2>
        
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
