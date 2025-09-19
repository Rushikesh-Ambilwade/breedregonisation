import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/breed-recognition", label: "Breed Recognition" },
    { path: "/disease-prediction", label: "Disease Prediction" },
    { path: "/ai-chatbot", label: "AI Chatbot" },
    { path: "/nearby-hospitals", label: "Nearby Hospitals" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-primary">BreedSense</span>
            </Link>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setActiveTab(item.path)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === item.path
                      ? "text-primary-foreground gradient-primary glow-primary"
                      : "text-foreground hover:text-primary hover:glow-accent hover:bg-accent/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Login/Signup Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="glow-hover">
                Login
              </Button>
              <Button className="gradient-primary glow-primary">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="fade-in-up">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="gradient-earth text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">About BreedSense</h3>
              <p className="text-white/80">
                Advanced AI-powered breed recognition and disease prediction system 
                designed specifically for cattle and buffalo farmers.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Features</h3>
              <ul className="space-y-2 text-white/80">
                <li className="hover:text-accent-glow transition-colors cursor-pointer">Breed Recognition</li>
                <li className="hover:text-accent-glow transition-colors cursor-pointer">Disease Prediction</li>
                <li className="hover:text-accent-glow transition-colors cursor-pointer">AI Chatbot</li>
                <li className="hover:text-accent-glow transition-colors cursor-pointer">Hospital Locator</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Contact</h3>
              <div className="space-y-2 text-white/80">
                <p>Email: info@breedsense.com</p>
                <p>Phone: +91 12345 67890</p>
                <p>Support: 24/7 Available</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-accent-glow hover:scale-110 transition-all cursor-pointer">
                  <span className="text-sm font-bold">F</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-accent-glow hover:scale-110 transition-all cursor-pointer">
                  <span className="text-sm font-bold">T</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-accent-glow hover:scale-110 transition-all cursor-pointer">
                  <span className="text-sm font-bold">I</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 BreedSense. All rights reserved. Made with ❤️ for farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;