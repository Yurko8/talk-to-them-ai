import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      <NavBar showTitle />
      <main className="flex-grow max-w-3xl mx-auto px-6 py-16 space-y-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h2>
        <p className="text-lg text-gray-300">
          We'd love to hear from you! Reach out via email at{' '}
          <a href="mailto:info@talktothem.ai" className="text-blue-400 underline">info@talktothem.ai</a>
          {' '}or follow us on social media.
        </p>
      </main>
      <div className="text-center pb-8">
        <Button onClick={() => navigate('/')} className="px-10 py-3 rounded-full text-lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;
