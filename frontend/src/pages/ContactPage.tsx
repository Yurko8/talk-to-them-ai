import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col animate-fade-in">
      <NavBar showTitle />
      <main className="flex-grow max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h2>
        <p className="text-lg text-gray-300 text-center">
          We'd love to hear from you! Reach out at{' '}
          <a
            href="mailto:talktothem@gmail.com"
            className="text-blue-400 underline"
          >
            talktothem@gmail.com
          </a>
        </p>

        <form className="space-y-4 max-w-lg mx-auto">
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Textarea placeholder="Your Message" required />
          <div className="flex justify-center">
            <Button type="submit" className="px-8 py-3">Send Message</Button>
          </div>
        </form>
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
