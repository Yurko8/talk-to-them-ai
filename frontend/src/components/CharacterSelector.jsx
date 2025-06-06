const CharacterSelector = ({ characterId, setCharacterId }) => {
  const characters = ["einstein", "curie", "feynman", "newton"];
  return (
    <div className="mb-4 text-center">
      <label className="mr-2 font-semibold text-gray-700">Scientist:</label>
      <select
        value={characterId}
        onChange={(e) => setCharacterId(e.target.value)}
        className="border rounded-md px-3 py-1 bg-white shadow-sm"
      >
        {characters.map((char) => (
          <option key={char} value={char}>
            {char.charAt(0).toUpperCase() + char.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelector;
