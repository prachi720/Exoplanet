import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import heroSpace from "@/assets/hero-space.jpg";

const Team = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const team = [
    {
      name: "Prachi Singh",
      Email: "prachi@gmail.com",
      
    },
    {
      name: "Soniya Singh",
      Email: "soniya@gmail.com",
      
    },
    {
      name: "Harshili Patni",
      Email: "harshili@gmail.com",

    },
    {
      name: "Mivan Mehta",
      Email: "mivan@gmail.com",

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
        {/* Mission Section */}
        <section className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-glow bg-clip-text text-transparent">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're combining cutting-edge AI with humanity's curiosity about the cosmos. Our goal is to democratize 
            exoplanet discovery, making it faster and more accessible to researchers worldwide.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card
                key={member.name}
                className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow-cyan group"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-glow flex items-center justify-center group-hover:opacity-80 transition-opacity">
                    <span className="text-2xl font-bold text-white">
                      {getInitials(member.name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Credits Section */}
        <section className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Acknowledgements</h2>
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <p>
                This project utilizes publicly available data from NASA's{" "}
                <a href="#" className="text-primary hover:underline">
                  Kepler Mission
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  TESS Mission
                </a>
                .
              </p>
              <p>
                Special thanks to the open-source community and researchers whose work in machine learning 
                and astrophysics made this project possible.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Team;
