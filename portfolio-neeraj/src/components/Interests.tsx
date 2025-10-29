import { BookOpen, Code, Gamepad2, Music, Plane, Camera } from "lucide-react";

const interests = [
  {
    title: "Open Source",
    description: "Contributing to open-source projects and learning from the community",
    icon: Code,
  },
  {
    title: "Reading",
    description: "Tech blogs, sci-fi novels, and books on philosophy and psychology",
    icon: BookOpen,
  },
  {
    title: "Gaming",
    description: "Strategy games and competitive esports - love the problem-solving aspect",
    icon: Gamepad2,
  },
  {
    title: "Music",
    description: "Playing guitar and exploring different genres from classical to electronic",
    icon: Music,
  },
  {
    title: "Travel",
    description: "Exploring new cultures and experiencing different perspectives",
    icon: Plane,
  },
  {
    title: "Photography",
    description: "Capturing moments and experimenting with composition and lighting",
    icon: Camera,
  }
];

const Interests = () => {
  return (
    <section id="interests" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Interests & <span className="gradient-text">Hobbies</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          What I do when I'm not coding
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div
              key={interest.title}
              className="group neon-card rounded-xl p-6 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.3)] transition-all hover:scale-105 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-2 border-primary/40 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                    <interest.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{interest.title}</h3>
                <p className="text-sm text-muted-foreground">{interest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
