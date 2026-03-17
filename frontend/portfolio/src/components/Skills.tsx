import React from "react";
import { Server, Cloud, Database, Code2 } from "lucide-react";

type Domain =
  | "Backend Engineering"
  | "Cloud & DevOps"
  | "Data & Messaging"
  | "Frontend (Supporting)";

const skillsData = {
  skills: [
    {
      domain: "Backend Engineering",
      skills: [
        "Java",
        "Spring Boot",
        "Spring Data JPA",
        "REST API Design",
        "Microservices",
        "JWT Authentication",
        "PostgreSQL",
        "SQL",
      ],
    },
    {
      domain: "Cloud & DevOps",
      skills: [
        "Linux",
        "Shell Scripting",
        "Docker",
        "Docker Compose",
        "Kubernetes",
        "CI/CD",
        "AWS",
        "Terraform",
      ],
    },
    {
      domain: "Data & Messaging",
      skills: [
        "Database Design",
        "Redis",
        "Apache Kafka",
        "API Integration",
        "Logging & Monitoring",
      ],
    },
    {
      domain: "Frontend (Supporting)",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Frontend–Backend Integration",
      ],
    },
  ],
};

const domainMeta: Record<
  Domain,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: "primary" | "secondary" }
> = {
  "Backend Engineering": { icon: Server, color: "primary" },
  "Cloud & DevOps": { icon: Cloud, color: "secondary" },
  "Data & Messaging": { icon: Database, color: "primary" },
  "Frontend (Supporting)": { icon: Code2, color: "secondary" },
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Technical <span className="gradient-text">Stack</span>
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Technologies and tools I use to build scalable backend systems and cloud-native applications.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.skills.map((category) => {
            const meta = domainMeta[category.domain as Domain];
            const Icon = meta.icon;
            const color = meta.color;

            return (
              <div
                key={category.domain}
                className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)] hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`p-3 rounded-lg ${
                      color === "primary"
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/10 border border-secondary/30"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        color === "primary" ? "text-primary" : "text-secondary"
                      }`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {category.domain}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-md text-sm border border-border bg-muted/50 
                                 hover:bg-primary/10 hover:border-primary/40 
                                 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;