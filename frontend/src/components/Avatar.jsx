const Avatar = ({ characterId }) => (
  <img
    src={`/avatars/${characterId}.png`}
    alt={`${characterId} avatar`}
    className="w-32 h-32 rounded-full shadow-md mx-auto mb-4"
  />
);

export default Avatar;
