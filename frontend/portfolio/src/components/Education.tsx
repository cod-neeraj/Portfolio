import React from "react";
import { GraduationCap } from "lucide-react";
import { educationData } from "../data/education";


const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Education</span>
        </h2>
        { educationData.length === 0 && (
          <div className="text-center py-12 border border-border rounded-2xl bg-muted/30">
            <GraduationCap className="mx-auto mb-4 w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              No education details added yet.
            </p>
          </div>
        )}
        {educationData.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)]"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">{edu.name}</h3>
                      <p className="text-primary">{edu.instituteName}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.years}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary font-medium">
                    {edu.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Education;