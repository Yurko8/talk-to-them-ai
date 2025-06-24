import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col animate-fade-in">
      {/* Navigation */}
      <NavBar showTitle />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-8 text-center">About Us</h2>

        <section className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            Welcome to <strong>Talk to Them AI</strong> — an innovative educational platform where you can interact with AI-powered
            personalities of some of history’s greatest scientists, mathematicians, philosophers, and thinkers.
          </p>

          <p>
            Our mission is to make learning engaging and accessible by bringing historical figures to life through conversation.
            Whether you want to explore physics with Einstein, dive into philosophy with Socrates, or understand chemistry with Marie Curie,
            our AI agents are here to guide you.
          </p>

          <p>
            This project combines cutting-edge AI technologies with a passion for education to create an immersive and inspiring learning experience.
            We hope you enjoy talking to these remarkable personalities and uncovering new knowledge.
          </p>

          <p>
            If you have any questions or want to collaborate, feel free to reach out via our Contact page.
          </p>
        </section>

        <div className="mt-12 flex justify-center">
          <Button onClick={() => navigate("/")} className="px-10 py-3 rounded-full text-lg">
            Back to Home
          </Button>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Talk to Them AI. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutUsPage;
