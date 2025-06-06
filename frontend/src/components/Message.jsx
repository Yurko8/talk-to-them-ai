const Message = ({ role, content, characterId }) => {
  const isUser = role === "user";
  return (
    <div className={`mb-3 ${isUser ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block px-4 py-2 rounded-lg shadow-sm max-w-[80%] ${
          isUser
            ? "bg-blue-500 text-white ml-auto"
            : "bg-white border text-gray-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
