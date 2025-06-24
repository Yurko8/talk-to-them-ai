import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import { Search, X } from "lucide-react";

const subjectCharacterMap: Record<
  string,
  { id: string; name: string; avatar: string }[]
> = {
  physics: [
    { id: "einstein", name: "Albert Einstein", avatar: "👨‍🔬" },
    { id: "feynman", name: "Richard Feynman", avatar: "🌀" },
    { id: "newton", name: "Isaac Newton", avatar: "🍎" },
  ],
  chemistry: [
    { id: "curie", name: "Marie Curie", avatar: "⚗️" },
    { id: "mendeleev", name: "Dmitri Mendeleev", avatar: "📊" },
    { id: "pauling", name: "Linus Pauling", avatar: "🧪" },
  ],
  mathematics: [
    { id: "euclid", name: "Euclid", avatar: "📐" },
    { id: "gauss", name: "Carl Gauss", avatar: "📈" },
    { id: "lovelace", name: "Ada Lovelace", avatar: "💻" },
  ],
  biology: [
    { id: "darwin", name: "Charles Darwin", avatar: "🐦" },
    { id: "franklin", name: "Rosalind Franklin", avatar: "🧬" },
    { id: "mendel", name: "Gregor Mendel", avatar: "🌱" },
  ],
  astronomy: [
    { id: "galileo", name: "Galileo Galilei", avatar: "🔭" },
    { id: "sagan", name: "Carl Sagan", avatar: "🌌" },
    { id: "rubin", name: "Vera Rubin", avatar: "🌠" },
  ],
  engineering: [
    { id: "tesla", name: "Nikola Tesla", avatar: "⚡️" },
    { id: "brunel", name: "Isambard Brunel", avatar: "🛤️" },
    { id: "lamarr", name: "Hedy Lamarr", avatar: "📡" },
  ],
  "computer-science": [
    { id: "turing", name: "Alan Turing", avatar: "🧠" },
    { id: "hopper", name: "Grace Hopper", avatar: "🖥️" },
    { id: "knuth", name: "Donald Knuth", avatar: "📘" },
  ],
  history: [
    { id: "herodotus", name: "Herodotus", avatar: "📜" },
    { id: "zinn", name: "Howard Zinn", avatar: "🏛️" },
    { id: "beard", name: "Mary Beard", avatar: "🏺" },
  ],
  philosophy: [
    { id: "socrates", name: "Socrates", avatar: "🤔" },
    { id: "beauvoir", name: "Simone de Beauvoir", avatar: "📚" },
    { id: "nietzsche", name: "Friedrich Nietzsche", avatar: "🦅" },
  ],
};

const funFacts = [
  "In space, astronauts can cry—but their tears don't fall.",
  "A photon takes 40,000 years to travel from the Sun's core to its surface.",
  "Quantum entanglement allows particles to affect each other instantly across vast distances.",
  "Time moves slower in stronger gravitational fields.",
  "The speed of light is the universal speed limit—nothing can go faster.",
];

const SubjectPage = () => {
  const navigate = useNavigate();
  const { subject = "physics" } = useParams<{ subject: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string; avatar: string }[]
  >([]);
  const [funFact] = useState(
    funFacts[Math.floor(Math.random() * funFacts.length)]
  );

  const characters = subjectCharacterMap[subject] || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = characters.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectPerson = (id: string) => {
    navigate(`/chat/${id}`);
  };

  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
  const subjectIcon = subject === "physics" ? "⚛️" : "📚";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <NavBar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Subject Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl mr-4">{subjectIcon}</div>
            <h1 className="text-5xl md:text-6xl font-bold">{subjectName}</h1>
          </div>

          {/* Fun Fact */}
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">*FUN FACT GENERATED</p>
            <p className="text-lg text-gray-300">{funFact}</p>
          </div>
        </div>

        {/* Character Buttons */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Choose a character</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => selectPerson(char.id)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl text-left shadow-md transition-all flex items-center space-x-3"
              >
                <span className="text-2xl">{char.avatar}</span>
                <span className="text-lg font-medium">{char.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* See Who's Here Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/subjects")}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-12 py-4 text-lg rounded-full"
          >
            See who is here
          </Button>
        </div>

        {/* Hand Pointer Animation */}
        <div className="flex justify-center mt-8">
          <div className="text-4xl animate-bounce">👆</div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
