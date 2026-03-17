import { useState, useEffect } from "react";
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
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        setText(currentRole.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    }, deleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-background/90 to-background"></div>

        {/* Soft Gradient Glow */}
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">

        {/* Role Badge with Cursor */}
        <div className="mb-6">
          <span className="text-primary text-lg md:text-xl font-medium tracking-wide">
            {text}
            <span className="animate-pulse ml-1">|</span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Neeraj Mittal
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          I design and build scalable backend systems and cloud-ready
          applications using Java, Spring Boot, AWS, and modern DevOps
          practices. Focused on automation, reliability, and production-grade
          architecture.
        </p>


        {/* Social Icons */}
        <div className="flex gap-6 justify-center">
          <a
            href="https://github.com/cod-neeraj"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl border border-primary/30 hover:bg-primary/10 hover:border-primary transition-all hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/neeraj-mittal-63945931a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl border border-primary/30 hover:bg-primary/10 hover:border-primary transition-all hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="mailto:neerajmittal957@gmail.com"
            className="p-3 rounded-2xl border border-primary/30 hover:bg-primary/10 hover:border-primary transition-all hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
  onClick={() =>
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }
  className="mt-16 animate-bounce flex items-center justify-center 
             w-10 h-10 rounded-full border border-primary/40 
             text-primary hover:bg-primary/10 transition-all"
>
  <ArrowDown className="w-5 h-5" />
</button>
      </div>
    </section>
  );
};

export default Hero; 