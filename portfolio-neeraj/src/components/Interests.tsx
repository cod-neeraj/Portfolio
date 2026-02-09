import { Code, BookOpen, Gamepad2, Music } from "lucide-react";

const interests = [
  {
    title: "Open Source",
    description: "Building, learning, and contributing to community-driven projects.",
    icon: Code,
  },
  {
    title: "Reading",
    description: "Technology, systems thinking, and psychology.",
    icon: BookOpen,
  },
  {
    title: "Strategy Games",
    description: "Competitive and analytical gameplay that sharpens problem-solving.",
    icon: Gamepad2,
  },
  {
    title: "Music",
    description: "Exploring different genres and creative expression.",
    icon: Music,
  },
];

const Interests = () => {
  return (
    <section id="interests" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Beyond <span className="gradient-text">Engineering</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          A glimpse into what keeps me curious and creative.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {interests.map((interest, index) => (
            <div
              key={interest.title}
              className="neon-card rounded-xl p-6 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <interest.icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {interest.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {interest.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;