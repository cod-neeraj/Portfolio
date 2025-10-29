import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "../assets/main.jpeg";

const roles = ["Software Developer", "Cloud Architect", "System Designer"];

const Hero = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[index % roles.length];

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(currentRole.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentRole.length) setDeleting(true);
      } else {
        setText(currentRole.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    }, deleting ? 100 : 150); // speed of typing/deleting

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
        <div className="absolute inset-0 gradient-bg opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center min-h-screen animate-fade-in">
        {/* Badges */}
        <div className="mb-6 flex flex-col items-center gap-4 animate-scale-in">
          <span className="inline-block px-6 py-3 rounded-full border-2 border-primary/50 bg-primary/10 text-primary text-sm font-semibold backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] transition-all">
            Third Year Student
          </span>

          <span className="inline-block px-6 py-3 rounded-full border-2 border-primary/50 bg-primary/10 text-primary text-sm font-semibold backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] transition-all">
            <span className="text-accent">{text}</span>
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in glow-text"
          style={{ animationDelay: "0.1s" }}
        >
          Hi, I'm <span className="gradient-text">Neeraj Mittal</span>
        </h1>

        {/* Description */}
        <p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Crafting innovative solutions through code. Passionate about building
          scalable applications and solving complex problems.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            variant="hero"
            size="lg"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Icons */}
        <div
          className="flex gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="https://github.com/cod-neeraj"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border-2 border-primary/40 bg-card/50 backdrop-blur-sm hover:bg-primary/20 hover:border-primary transition-all shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/neeraj-mittal-63945931a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border-2 border-secondary/40 bg-card/50 backdrop-blur-sm hover:bg-secondary/20 hover:border-secondary transition-all shadow-[0_0_15px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--secondary)/0.6)] hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="p-4 rounded-full border-2 border-accent/40 bg-card/50 backdrop-blur-sm hover:bg-accent/20 hover:border-accent transition-all shadow-[0_0_15px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)] hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Scroll Down Arrow */}
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-16 animate-bounce mx-auto flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary/50 text-primary hover:bg-primary/20 transition-all"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
