import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Telescope, Signal, Brain, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import heroSpace from "@/assets/hero-space.jpg";

const Model = () => {
  const pipeline = [
    {
      icon: Telescope,
      title: "Raw NASA Light Curve",
      description: "Time-series brightness data from Kepler/TESS missions",
    },
    {
      icon: Signal,
      title: "Preprocessing",
      description: "Noise reduction, normalization, and feature extraction",
    },
    {
      icon: Brain,
      title: "Deep Learning CNN",
      description: "Convolutional neural network trained on thousands of examples",
    },
    {
      icon: Target,
      title: "Classification Output",
      description: "Transit detected or false positive with confidence score",
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

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-glow bg-clip-text text-transparent">
            How Our Model Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A deep learning pipeline for automated exoplanet detection
          </p>
        </div>

        {/* Pipeline Infographic */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipeline.map((step, index) => (
              <Card
                key={step.title}
                className="relative bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all group"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-glow-cyan transition-all">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    {index < pipeline.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-12 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Explanations */}
        <section className="max-w-4xl mx-auto space-y-4">
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/30 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Why Deep Learning?</span>
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-2 bg-card/30 backdrop-blur border-primary/10">
                <CardContent className="pt-6 space-y-3 text-muted-foreground">
                  <p>
                    Traditional methods of identifying exoplanets require manual inspection of thousands of light curves—a 
                    time-consuming process prone to human error. Deep learning, specifically Convolutional Neural Networks (CNNs), 
                    can learn complex patterns in time-series data automatically.
                  </p>
                  <p>
                    Our model was trained on over 10,000 labeled light curves from NASA's Kepler mission, achieving 95%+ accuracy 
                    in distinguishing true planetary transits from false positives like stellar variability or instrumental artifacts.
                  </p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/30 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>What is a Transit?</span>
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-2 bg-card/30 backdrop-blur border-primary/10">
                <CardContent className="pt-6 space-y-3 text-muted-foreground">
                  <p>
                    A transit occurs when a planet passes directly between its host star and an observer (like a telescope). 
                    This causes a small, periodic dip in the star's brightness—typically 0.01% to 1% depending on the planet's size.
                  </p>
                  <p>
                    By measuring the depth, duration, and frequency of these dips, astronomers can determine the planet's size, 
                    orbital period, and distance from its star. Our AI model detects these subtle patterns that might be missed by 
                    traditional algorithms.
                  </p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/30 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Why It Matters</span>
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-2 bg-card/30 backdrop-blur border-primary/10">
                <CardContent className="pt-6 space-y-3 text-muted-foreground">
                  <p>
                    Over 5,000 exoplanets have been confirmed, but millions more await discovery in NASA's vast datasets. 
                    Automated AI analysis accelerates this search by orders of magnitude, allowing researchers to focus on 
                    the most promising candidates for follow-up observations.
                  </p>
                  <p>
                    Finding Earth-like exoplanets in habitable zones could one day answer humanity's oldest question: 
                    Are we alone in the universe? AI is helping us search faster than ever before.
                  </p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </section>
      </main>
    </div>
  );
};

export default Model;
