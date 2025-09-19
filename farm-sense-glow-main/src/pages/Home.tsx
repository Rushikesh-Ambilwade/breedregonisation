import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("bunch-effect");
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = cardsRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Breed Recognition",
      description: "Upload images or videos to identify cattle and buffalo breeds with AI precision.",
      icon: "🐄",
      gradient: "gradient-primary",
    },
    {
      title: "Disease Prediction",
      description: "Early detection of diseases through image analysis and symptom evaluation.",
      icon: "🔬",
      gradient: "gradient-hero",
    },
    {
      title: "AI Chatbot",
      description: "Get instant answers to your farming questions in multiple languages.",
      icon: "🤖",
      gradient: "gradient-wave",
    },
    {
      title: "Hospital Locator",
      description: "Find nearby veterinary hospitals with GPS-based location services.",
      icon: "🏥",
      gradient: "gradient-earth",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bounce-in">
            Breed Recognition System
          </h1>
          <p className="text-xl md:text-2xl mb-8 fade-in-up">
            Smart AI for Cattle & Buffalo Farmers
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center fade-in-up">
            <Link to="/breed-recognition">
              <Button size="lg" className="gradient-primary glow-primary text-lg px-8 py-4">
                Start Recognition
              </Button>
            </Link>
            <Link to="/disease-prediction">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 glow-hover text-lg px-8 py-4">
                Disease Prediction
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Revolutionizing Livestock Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced AI system helps farmers identify breeds, predict diseases, and connect with 
              veterinary services - all in one comprehensive platform designed specifically for the 
              modern agricultural community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📊
              </div>
              <h3 className="text-xl font-bold mb-2">99% Accuracy</h3>
              <p className="text-muted-foreground">State-of-the-art AI models trained on millions of livestock images</p>
            </div>
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">Get breed identification and disease predictions in seconds</p>
            </div>
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 gradient-earth rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🌍
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Language</h3>
              <p className="text-muted-foreground">Available in English, Hindi, and Marathi for all farmers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background" ref={cardsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Powerful Features for Modern Farmers
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your livestock with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card opacity-0 hover:scale-105 transition-all duration-300 rotate-glow">
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl floating`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 fade-in-up">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 fade-in-up">
            Join thousands of farmers who trust BreedSense for their livestock management needs
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link to="/breed-recognition">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 glow-hover text-lg px-8 py-4">
                Get Started Free
              </Button>
            </Link>
            <Link to="/ai-chatbot">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 glow-hover text-lg px-8 py-4">
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;