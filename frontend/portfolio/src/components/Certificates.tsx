import { Award, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { certificateData } from "../data/certificate";

const Certificates = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Certificates</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificateData.map((cert, index) => (
            <div
              key={index}
              className="neon-card rounded-xl p-6 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)] transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">{cert.name}</h3>
              </div>

              <p className="text-muted-foreground text-sm">
                {cert.instituteName}
              </p>

              <p className="text-xs text-muted-foreground mt-1 mb-4">
                {cert.date}
              </p>

              <Button
                size="sm"
                variant="outline"
                asChild
                className="w-full"
              >
                <a href={cert.imageUrl} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Certificate
                </a>
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;