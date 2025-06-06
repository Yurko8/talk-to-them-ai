
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {/* Brain Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="w-full h-full bg-white rounded-full opacity-90 relative overflow-hidden">
              <div className="absolute inset-4 grid grid-cols-2 gap-1">
                <div className="bg-gray-800 rounded-tl-full"></div>
                <div className="bg-gray-800 rounded-tr-full"></div>
                <div className="bg-gray-800 rounded-bl-full"></div>
                <div className="bg-gray-800 rounded-br-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Talk To Them AI
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in">
          Talk to history – from Albert Einstein to Cleopatra.
        </p>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
          <p className="text-gray-400 leading-relaxed mb-6">
            Talk to Them AI is an innovative platform that connects curious minds with the greatest thinkers in 
            history—powered by artificial intelligence. Whether you're a student, teacher, or lifelong learner, our 
            goal is to make education more engaging by letting you have real conversations with iconic figures in 
            science, philosophy, literature, and beyond.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            Imagine asking Einstein about relativity, debating ethics with Socrates, or exploring the universe with 
            Carl Sagan—all from your screen. Through advanced AI technology, we simulate meaningful, 
            educational dialogues that bring knowledge to life.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We believe learning should be immersive, inspiring, and accessible to everyone.
          </p>
        </div>

        {/* Start Button */}
        <Button 
          onClick={() => navigate('/subjects')}
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-12 py-4 text-lg rounded-full"
        >
          START NOW
        </Button>
      </div>
    </div>
  );
};

export default Index;
