import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'katex/dist/katex.min.css';

import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import SubjectPage from "./pages/SubjectPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import AboutUsPage from "./pages/AboutUsPage";  // ← Import About Us page here

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subject/:subject" element={<SubjectPage />} />
          <Route path="/chat/:person" element={<ChatPage />} />

          {/* Add About Us route */}
          <Route path="/about" element={<AboutUsPage />} />

          {/* Catch-all route for unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
