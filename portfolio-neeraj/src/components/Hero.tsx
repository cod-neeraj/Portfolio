import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "../assets/main.jpeg";

const roles = [
  "Backend Engineer",
  "DevOps Enthusiast",
  "Cloud-Native Builder",
];

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
    }, deleting ? 80 : 120);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center min-h-screen animate-fade-in">
        
        {/* Role Badge */}
        <div className="mb-8">
          <span className="px-6 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium tracking-wide">
            {text}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Hi, I'm{" "}
          <span className="gradient-text">
            Neeraj Mittal
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          I build scalable backend systems and cloud-ready applications using
          Java, Spring Boot, and modern DevOps practices. Focused on clean
          architecture, automation, and production-grade engineering.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            variant="hero"
            size="lg"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            View Projects
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
            Contact Me
          </Button>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 justify-center">
          <a
            href="https://github.com/cod-neeraj"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-primary/40 hover:bg-primary/10 hover:border-primary transition-all hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/neeraj-mittal-63945931a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-primary/40 hover:bg-primary/10 hover:border-primary transition-all hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="mailto:your-email@example.com"
            className="p-3 rounded-full border border-primary/40 hover:bg-primary/10 hover:border-primary transition-all hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll Down */}
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-16 animate-bounce flex items-center justify-center w-10 h-10 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;