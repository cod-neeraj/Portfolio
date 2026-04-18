import React from "react";
import { Calendar } from "lucide-react";
import { experienceData } from "../data/experience";

const Experience: React.FC = () => {

  return (
    <section id="experience" className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Work <span className="gradient-text">Experience</span>
        </h2>
          <div className="space-y-6 animate-fade-in">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)]"
              >
                <div className="flex justify-between">

                  <div>
                    <h3 className="text-xl font-semibold">{exp.jobRole}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>

                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.time}</span>
                    </div>
                  </div>

                  
                  
                </div>

                <ul className="mt-4 space-y-1 text-muted-foreground list-disc list-inside">
                  {exp.experience.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        

      </div>
    </section>
  );
};

export default Experience;