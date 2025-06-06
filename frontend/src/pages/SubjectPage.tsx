
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Search, X } from "lucide-react";

const physicsPersonalities = [
  "Albert Einstein",
  "Isaac Newton", 
  "Marie Curie",
  "Niels Bohr",
  "Richard Feynman",
  "Stephen Hawking",
  "Galileo Galilei",
  "Max Planck"
];

const funFacts = [
  "In space, astronauts can cry—but their tears don't fall.",
  "A photon takes 40,000 years to travel from the Sun's core to its surface.",
  "Quantum entanglement allows particles to affect each other instantly across vast distances.",
  "Time moves slower in stronger gravitational fields.",
  "The speed of light is the universal speed limit—nothing can go faster."
];

const SubjectPage = () => {
  const navigate = useNavigate();
  const { subject } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [funFact] = useState(funFacts[Math.floor(Math.random() * funFacts.length)]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = physicsPersonalities.filter(person =>
        person.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectPerson = (person: string) => {
    navigate(`/chat/${person.toLowerCase().replace(' ', '-')}`);
  };

  const subjectName = subject?.charAt(0).toUpperCase() + subject?.slice(1) || "Physics";
  const subjectIcon = subject === "physics" ? "⚛️" : "📚";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
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

        {/* Search Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Look for figure</h2>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for a historical figure..."
                className="pl-10 pr-10 py-4 bg-white text-black border-none rounded-lg text-lg"
              />
              {searchQuery && (
                <X 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                  }}
                />
              )}
            </div>
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
                {suggestions.map((person) => (
                  <div
                    key={person}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-black border-b border-gray-100 last:border-b-0"
                    onClick={() => selectPerson(person)}
                  >
                    {person}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* See Who's Here Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/subjects')}
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
