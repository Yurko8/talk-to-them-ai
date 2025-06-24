import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar({ showTitle = false }: { showTitle?: boolean }) {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-900 rounded-full relative">
            <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
          </div>
        </div>
        {showTitle && <h1 className="text-xl font-bold">Talk to Them AI</h1>}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex space-x-8">
          <a href="/about" className="text-gray-300 hover:text-white transition-colors">About us</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
        </div>
        <ThemeToggle />
        <Button variant="ghost" className="text-gray-300 hover:text-white">Log in</Button>
      </div>
    </nav>
  );
}
