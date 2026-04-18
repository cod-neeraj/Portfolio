import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-primary/20">
      <div className="container mx-auto max-w-6xl">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Left */}
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="font-medium">Neeraj Mittal</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </p>

          {/* Right */}
          <div className="flex gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition">
              About
            </a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition">
              Projects
            </a>
            <a href="#experience" className="text-sm text-muted-foreground hover:text-primary transition">
              Experience
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition">
              Contact
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Neeraj Mittal. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;