import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Database, Telescope } from "lucide-react";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import FeatureCard from "@/components/FeatureCard";
import heroSpace from "@/assets/hero-space.jpg";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast AI Classification",
      description: "Deep learning models detect transits in milliseconds, processing thousands of light curves efficiently.",
    },
    {
      icon: Database,
      title: "NASA Dataset Integration",
      description: "Trained on real Kepler and TESS mission data for accurate exoplanet detection.",
    },
    {
      icon: Telescope,
      title: "Transit Detection",
      description: "Identifies periodic brightness dips that indicate planetary transits across distant stars.",
    },
    {
      icon: Sparkles,
      title: "Accelerating Discovery",
      description: "Automates analysis that would take human researchers weeks, enabling faster exploration.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div 
        className="fixed inset-0 opacity-50"
        style={{
          backgroundImage: `url(${heroSpace})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      />
      <StarField />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        <div className="container mx-auto px-4 z-10 text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
            <span className="bg-gradient-glow bg-clip-text text-transparent animate-glow-pulse drop-shadow-lg">
              A World Away
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Hunting for Exoplanets with AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            Automating exoplanet discovery with Deep Learning
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/demo">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-cyan hover:shadow-glow-cyan transition-all duration-300"
              >
                Try the Demo
              </Button>
            </Link>
            <Link to="/model">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-3 h-3 rounded-full bg-primary shadow-glow-cyan" />
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="container mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Discovering New Worlds Through AI
            </h2>
            <p className="text-lg text-gray-200 drop-shadow-md">
              Our project leverages cutting-edge deep learning to analyze light curves from NASA's Kepler and TESS missions. 
              By detecting subtle brightness variations as planets transit their host stars, we accelerate the discovery of 
              exoplanets—worlds beyond our solar system that could harbor life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-primary/30 py-8 px-4 z-10">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-2">
            <Telescope className="w-5 h-5 text-primary" />
            <span className="text-gray-300">© 2025 Exoplanet AI Project</span>
          </div>
          <div className="flex gap-6">
            <Link to="/model" className="text-gray-300 hover:text-primary transition-colors">
              Model Overview
            </Link>
            <Link to="/team" className="text-gray-300 hover:text-primary transition-colors">
              Our Team
            </Link>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
