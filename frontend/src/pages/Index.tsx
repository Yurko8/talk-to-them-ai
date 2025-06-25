import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white animate-fade-in">
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {/* Brain Logo */}
      <div className="flex justify-center mb-8 animate-fade-in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-20 h-20 text-white fill-current"
        >
          <path d="M208 0C156.3 0 112 44.3 112 96v8.3C98.6 117.1 80 137.8 80 160v9.3c-29.3 7.3-51.7 33.7-51.7 65.1c0 23.3 11.5 44 29.2 56.9C38.5 312.2 32 330.2 32 349.3C32 384.8 62.7 416 99.6 416c1.1 0 2.2-.1 3.2-.1c6.1 19.8 23.5 35.1 44.7 38c9.3 18.7 28.5 30.1 49.5 30.1c10.4 0 20.5-2.9 29.2-8.2V0H208zM432 160c0-22.2-18.6-42-32-55.7V96c0-51.7-44.3-96-96-96h-18.4v475.8c8.6 5.3 18.7 8.2 29.2 8.2c21 0 40.2-11.4 49.5-30.1c21.2-2.9 38.6-18.2 44.7-38c1.1 0 2.1 .1 3.2 .1c36.9 0 67.6-31.2 67.6-66.7c0-19.1-6.5-37.1-25.5-58c17.7-12.9 29.2-33.6 29.2-56.9c0-31.4-22.4-57.8-51.7-65.1V160z"/>
        </svg>
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
