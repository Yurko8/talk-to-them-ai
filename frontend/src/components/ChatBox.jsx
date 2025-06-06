import Message from "./Message";

const ChatBox = ({ messages, characterId }) => (
  <div className="bg-gray-50 border rounded-md p-4 h-96 overflow-y-auto mb-4">
    {messages.map((msg, i) => (
      <Message key={i} role={msg.role} content={msg.content} characterId={characterId} />
    ))}
  </div>
);

export default ChatBox;
