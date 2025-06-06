// src/App.jsx
import { useState, useEffect } from "react";
import { askScientist } from "./api";
import Avatar from "./components/Avatar";
import CharacterSelector from "./components/CharacterSelector";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";

const DEFAULT_CHARACTER = "einstein";

function App() {
  const [characterId, setCharacterId] = useState(DEFAULT_CHARACTER);
  const [userId] = useState(() => {
    const stored = localStorage.getItem("user_id");
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem("user_id", newId);
    return newId;
  });
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm here to help you learn. What would you like to talk about today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await askScientist(userId, characterId, question);
      setMessages([...newMessages, { role: "assistant", content: res.answer }]);
    } catch (err) {
      console.error("API error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-6 mt-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Talk to Them AI</h1>
        <CharacterSelector characterId={characterId} setCharacterId={setCharacterId} />
        <Avatar characterId={characterId} />
        <ChatBox messages={messages} characterId={characterId} />
        <InputBar onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}

export default App;
