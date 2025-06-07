import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const subjects = [
  { name: "Mathematics", icon: "🧮", description: "Numbers and equations" },
  { name: "Physics", icon: "⚛️", description: "Forces and energy" },
  { name: "Chemistry", icon: "🧪", description: "Elements and reactions" },
  { name: "Biology", icon: "🧬", description: "Life and organisms" },
  { name: "Computer Science", icon: "💻", description: "Code and algorithms" },
  { name: "Astronomy", icon: "🔭", description: "Stars and cosmos" },
  { name: "Engineering", icon: "⚙️", description: "Design and innovation" },
  { name: "History", icon: "📜", description: "Past civilizations" },
  { name: "Philosophy", icon: "🧠", description: "Thought and wisdom" }
];

const Subjects = () => {
  const navigate = useNavigate();

  const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

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

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
          Choose the subject
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={subject.name}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(`/subject/${slugify(subject.name)}`)}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {subject.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {subject.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {subject.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
