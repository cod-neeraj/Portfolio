import { Button } from "./ui/button";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-4xl">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="neon-card rounded-xl p-8">

              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Contact Information
              </h3>

              <div className="space-y-4">

                {/* Email */}
                <a
                  href="mailto:neerajmittal957@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all"
                >
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/40">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs">Email</p>
                    <p className="font-semibold">
                      neerajmittal957@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+917973008735"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all"
                >
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/40">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs">Phone</p>
                    <p className="font-semibold">+91 7973008735</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/40">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs">Location</p>
                    <p className="font-semibold">Punjab, India</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8 pt-6 border-t border-primary/30">
                <p className="text-sm mb-4 font-semibold">Connect with me</p>

                <div className="flex gap-3">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com/cod-neeraj" target="_blank">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>

                  <Button variant="outline" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>

                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:neerajmittal957@gmail.com">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="neon-card rounded-xl p-8 flex flex-col justify-center">

            <h3 className="text-2xl font-bold mb-4 gradient-text-secondary">
              Let's Work Together
            </h3>

            <p className="text-muted-foreground mb-6">
              I'm currently looking for opportunities. Feel free to reach out!
            </p>

            {/* IMPORTANT: plain anchor (guaranteed working) */}
            <a
              href="mailto:neerajmittal957@gmail.com"
              className="w-full text-center bg-primary text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send a Message
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;