import { useState } from "react";

const InputBar = ({ onSend, loading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        placeholder="Type your question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow border border-gray-300 rounded-l-md p-2 shadow-sm"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition"
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default InputBar;
