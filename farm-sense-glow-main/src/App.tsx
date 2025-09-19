import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BreedRecognition from "./pages/BreedRecognition";
import DiseasePrediction from "./pages/DiseasePrediction";
import AIChatbot from "./pages/AIChatbot";
import NearbyHospitals from "./pages/NearbyHospitals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="breed-recognition" element={<BreedRecognition />} />
            <Route path="disease-prediction" element={<DiseasePrediction />} />
            <Route path="ai-chatbot" element={<AIChatbot />} />
            <Route path="nearby-hospitals" element={<NearbyHospitals />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
