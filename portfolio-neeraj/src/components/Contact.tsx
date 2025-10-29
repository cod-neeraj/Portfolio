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
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="neon-card rounded-xl p-8 group hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
              
              <div className="space-y-4">
                <a href="mailto:contact@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all group/item">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 group-hover/item:border-primary group-hover/item:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-semibold">neerajmittal957@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+1234567890" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all group/item">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 group-hover/item:border-secondary group-hover/item:shadow-[0_0_20px_hsl(var(--secondary)/0.5)] transition-all">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-semibold">+91 7973008735</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-muted-foreground group/item">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/40 shadow-[0_0_10px_hsl(var(--accent)/0.3)]">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold">Punjab,India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/30">
                <p className="text-sm text-muted-foreground mb-4 font-semibold">Connect with me</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:contact@example.com">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="neon-card rounded-xl p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 gradient-text-secondary">Let's Work Together</h3>
              <p className="text-muted-foreground mb-6">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
                I'll try my best to get back to you!
              </p>
              <Button variant="hero" size="lg" className="w-full" asChild>
                <a href="mailto:contact@example.com">
                  Send a Message
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
