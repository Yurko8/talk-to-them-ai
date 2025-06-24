import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import CharacterAnimation from "@/components/CharacterAnimation";

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const personalities: {
  [key: string]: {
    name: string;
    description: string;
    avatar: string;
    funFacts: string[];
  };
} = {
  einstein: {
    name: "Albert Einstein",
    description: "Theoretical physicist known for the theory of relativity",
    avatar: "/characters/einstein.png",
    funFacts: [
      "He didn’t speak fluently until age 9.",
      "He was a passionate violinist.",
      "He disliked wearing socks and often went without them."
    ]
  },
  feynman: {
    name: "Richard Feynman",
    description: "Famous for his work in quantum mechanics and QED",
    avatar: "/characters/feynman.png",
    funFacts: [
      "He played bongos in a samba band.",
      "He cracked safes for fun at Los Alamos.",
      "He once painted for a topless bar."
    ]
  },
  newton: {
    name: "Isaac Newton",
    description: "Father of classical mechanics",
    avatar: "/characters/newton.png",
    funFacts: [
      "He once stuck a needle in his eye to study light.",
      "He wrote more on alchemy than physics.",
      "He became Warden of the Royal Mint and went after counterfeiters."
    ]
  },
  curie: {
    name: "Marie Curie",
    description: "Pioneer in radioactivity",
    avatar: "/characters/curie.png",
    funFacts: [
      "Her notebooks are still radioactive.",
      "She carried test tubes of radium in her pockets.",
      "She was the first woman to win a Nobel—and the first person to win two."
    ]
  },
  mendeleev: {
    name: "Dmitri Mendeleev",
    description: "Creator of the periodic table",
    avatar: "/characters/mendeleev.png",
    funFacts: [
      "He arranged the periodic table in a dream.",
      "He predicted elements before they were discovered.",
      "He once traveled with a suitcase of vodka to prove its purity standards."
    ]
  },
  pauling: {
    name: "Linus Pauling",
    description: "Chemist and peace activist",
    avatar: "/characters/pauling.png",
    funFacts: [
      "He’s the only person to win two unshared Nobel Prizes.",
      "He campaigned against nuclear weapons using vitamin C.",
      "He was once banned from traveling by the U.S. government."
    ]
  },
  euclid: {
    name: "Euclid",
    description: "Father of geometry",
    avatar: "/characters/euclid.png",
    funFacts: [
      "We know almost nothing personal about him.",
      "His book 'Elements' was used for over 2,000 years.",
      "He inspired countless generations with just a compass and straightedge."
    ]
  },
  gauss: {
    name: "Carl Gauss",
    description: "Prince of mathematicians",
    avatar: "/characters/gauss.png",
    funFacts: [
      "He corrected his father's bookkeeping at age 3.",
      "He discovered a prime number formula at age 15.",
      "He preferred pure theory over messy experiments."
    ]
  },
  lovelace: {
    name: "Ada Lovelace",
    description: "First computer programmer",
    avatar: "/characters/lovelace.png",
    funFacts: [
      "She predicted artificial intelligence in the 1800s.",
      "She was Lord Byron’s daughter.",
      "Her algorithm was never run on a real machine—because it didn’t exist yet."
    ]
  },
  darwin: {
    name: "Charles Darwin",
    description: "Father of evolution",
    avatar: "/characters/darwin.png",
    funFacts: [
      "He ate every exotic animal he studied.",
      "He almost became a clergyman instead of a scientist.",
      "He delayed publishing his theory for 20 years."
    ]
  },
  franklin: {
    name: "Rosalind Franklin",
    description: "Key contributor to DNA discovery",
    avatar: "/characters/franklin.png",
    funFacts: [
      "She used X-rays to photograph DNA’s double helix.",
      "Her contributions were overlooked for years.",
      "She also studied viruses and coal."
    ]
  },
  mendel: {
    name: "Gregor Mendel",
    description: "Father of genetics",
    avatar: "/characters/mendel.png",
    funFacts: [
      "He was a monk who experimented on peas.",
      "His work was ignored until after his death.",
      "He once failed his teaching exams."
    ]
  },
  galileo: {
    name: "Galileo Galilei",
    description: "Astronomer and physicist",
    avatar: "/characters/galileo.png",
    funFacts: [
      "He built his own telescope to explore the skies.",
      "He discovered Jupiter’s moons.",
      "He was put under house arrest for defending heliocentrism."
    ]
  },
  sagan: {
    name: "Carl Sagan",
    description: "Popularized astronomy",
    avatar: "/characters/sagan.png",
    funFacts: [
      "He sent a golden record into space aboard Voyager.",
      "He popularized the phrase 'billions and billions.'",
      "He advocated for cannabis research."
    ]
  },
  rubin: {
    name: "Vera Rubin",
    description: "Dark matter pioneer",
    avatar: "/characters/rubin.png",
    funFacts: [
      "She found evidence that galaxies are held together by dark matter.",
      "She fought sexism in science.",
      "A mountain on Pluto is named after her."
    ]
  },
  tesla: {
    name: "Nikola Tesla",
    description: "Inventor and electrical engineer",
    avatar: "/characters/tesla.png",
    funFacts: [
      "He slept just 2 hours a day.",
      "He once lit 200 lamps from 25 miles away wirelessly.",
      "He had a photographic memory and feared pearls."
    ]
  },
  brunel: {
    name: "Isambard Kingdom Brunel",
    description: "Famous civil engineer",
    avatar: "/characters/brunel.png",
    funFacts: [
      "He once got stuck in one of his own tunnels.",
      "He designed ships, bridges, and even hospitals.",
      "He wore a giant top hat and was under 5’ tall."
    ]
  },
  lamarr: {
    name: "Hedy Lamarr",
    description: "Inventor and actress, co-invented frequency hopping",
    avatar: "/characters/lamarr.png",
    funFacts: [
      "She invented tech that led to Wi-Fi during WWII.",
      "She also starred in 1940s Hollywood films.",
      "Her patent was ignored until decades later."
    ]
  },
  turing: {
    name: "Alan Turing",
    description: "Father of computer science and AI",
    avatar: "/characters/turing.png",
    funFacts: [
      "He cracked the Nazi Enigma code.",
      "He built the foundations of modern computing.",
      "He was chemically castrated for being gay."
    ]
  },
  hopper: {
    name: "Grace Hopper",
    description: "Pioneer of computer programming",
    avatar: "/characters/hopper.png",
    funFacts: [
      "She coined the term 'debugging' after finding a moth in a computer.",
      "She helped invent COBOL.",
      "She retired from the Navy as a Rear Admiral."
    ]
  },
  knuth: {
    name: "Donald Knuth",
    description: "Father of algorithm analysis",
    avatar: "/characters/knuth.png",
    funFacts: [
      "He created TeX, the gold standard for math typesetting.",
      "He offers rewards for finding bugs in his books.",
      "He once paused all email to focus on deep work."
    ]
  },
  herodotus: {
    name: "Herodotus",
    description: "Ancient Greek historian",
    avatar: "/characters/herodotus.png",
    funFacts: [
      "He is called the 'Father of History.'",
      "He collected stories from all over the known world.",
      "He mixed fact with legend freely."
    ]
  },
  zinn: {
    name: "Howard Zinn",
    description: "Historian and social activist",
    avatar: "/characters/zinn.png",
    funFacts: [
      "He flew bombing missions in WWII before becoming anti-war.",
      "He wrote 'A People’s History of the United States.'",
      "He often gave voice to ordinary people over elites."
    ]
  },
  beard: {
    name: "Mary Beard",
    description: "Classical historian and author",
    avatar: "/characters/beard.png",
    funFacts: [
      "She’s known for making Roman history feel modern.",
      "She embraces social media to engage with the public.",
      "She was once told women don’t belong in history—so she doubled down."
    ]
  },
  socrates: {
    name: "Socrates",
    description: "Classical Greek philosopher",
    avatar: "/characters/socrates.png",
    funFacts: [
      "He never wrote anything down—his student Plato did.",
      "He annoyed Athenians with endless questions.",
      "He was sentenced to death for corrupting youth."
    ]
  },
  beauvoir: {
    name: "Simone de Beauvoir",
    description: "Existentialist philosopher and feminist",
    avatar: "/characters/beauvoir.png",
    funFacts: [
      "She wrote 'The Second Sex', a founding text of feminism.",
      "She had a lifelong relationship with Jean-Paul Sartre.",
      "She once said 'One is not born, but rather becomes, a woman.'"
    ]
  },
  nietzsche: {
    name: "Friedrich Nietzsche",
    description: "Philosopher, cultural critic, poet",
    avatar: "/characters/nietzsche.png",
    funFacts: [
      "He wrote books in poetic aphorisms.",
      "He declared 'God is dead'—and meant it philosophically.",
      "He went mad after hugging a beaten horse."
    ]
  }
};


interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const getUserId = () => {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = "user-" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("user_id", id);
  }
  return id;
};

const renderMessageWithMath = (text: string) => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\])/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('$$') || part.startsWith('\\[')) {
      const content = part.replace(/^\$\$|^\[|\\\[|\\\]|\$\$$/g, '');
      return <BlockMath key={index}>{content}</BlockMath>;
    }
    if (part.startsWith('$')) {
      const content = part.replace(/^\$|\$$/g, '');
      return <InlineMath key={index}>{content}</InlineMath>;
    }
    return <span key={index}>{part}</span>;
  });
};

const ChatPage = () => {
  const navigate = useNavigate();
  const { person } = useParams<{ person: string }>();
  const characterKey = person || "einstein";
  const character = personalities[characterKey] || personalities["einstein"];

  const [animationStatus, setAnimationStatus] = useState<"blinking" | "listening" | "talking">("blinking");

  const randomFact = useMemo(() => {
    const facts = character.funFacts || [];
    return facts.length > 0
      ? facts[Math.floor(Math.random() * facts.length)]
      : "No fun facts available.";
  }, [character]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi, I am ${character.name}, how can I help?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const askBackend = async (userId: string, characterId: string, question: string) => {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, character_id: characterId, question })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "API error");
    }

    const data = await res.json();
    return data.answer;
  };

  const simulateTyping = (fullText: string) => {
    const id = messages.length + 2;
    setMessages(prev => [...prev, { id, text: "", isUser: false, timestamp: new Date() }]);

    let index = 0;
    let currentText = "";

    const interval = setInterval(() => {
      currentText += fullText[index];
      index++;
      setMessages(prev =>
        prev.map(m => m.id === id ? { ...m, text: currentText } : m)
      );
      if (index >= fullText.length) {
        clearInterval(interval);
        setAnimationStatus("blinking");
      }
    }, 20);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setAnimationStatus("blinking");

    try {
      const userId = getUserId();
      const answer = await askBackend(userId, characterKey, inputMessage);
      simulateTyping(answer);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Sorry, something went wrong while contacting the AI.",
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setAnimationStatus("talking");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-8">
          <div
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-6 h-6 bg-gray-900 rounded-full relative">
              <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white">About us</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
          </div>
        </div>
        <Button variant="ghost" className="text-gray-300 hover:text-white">Log in</Button>
      </nav>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 mb-4">*VIDEO WITH FACE MOVING</p>
        <div className="w-80 h-80 mx-auto bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700 flex items-center justify-center">
          <CharacterAnimation character={characterKey} status={animationStatus} />
        </div>
        <p className="text-sm text-gray-400 mt-4">{character.description}</p>
        <p className="text-sm text-gray-300 italic mt-2">🌟 Fun fact: {randomFact}</p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-8">{character.name}</h2>

        <div className="flex-1 mb-6 space-y-4 overflow-y-auto max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-700 text-white rounded-bl-sm'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {renderMessageWithMath(message.text)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mb-4">*VOICE OVER (API)</p>

        <div className="flex gap-3 mb-6">
          <Input
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              setAnimationStatus("listening");
            }}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
