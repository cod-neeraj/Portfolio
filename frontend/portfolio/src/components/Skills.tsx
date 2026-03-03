import React from "react";
import { Server, Cloud, Database, Code2 } from "lucide-react";

/* ============================
   DOMAIN TYPES
============================ */
type Domain =
  | "Backend Engineering"
  | "Cloud & DevOps"
  | "Data & Messaging"
  | "Frontend (Supporting)";

/* ============================
   SKILLS DATA
============================ */
const skillsData = {
  skills: [
    {
      domain: "Backend Engineering",
      skills: [
        "Java",
        "Spring Boot",
        "Spring Data JPA",
        "REST API Design",
        "Microservices (Fundamentals)",
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
        "Kubernetes (Basics)",
        "CI/CD (Jenkins, GitHub Actions)",
        "AWS (Core Services)",
        "Terraform (Basics)",
      ],
    },
    {
      domain: "Data & Messaging",
      skills: [
        "Database Design",
        "Redis",
        "Apache Kafka (Concepts)",
        "API Integration",
        "Logging & Monitoring (Concepts)",
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

/* ============================
   DOMAIN META
============================ */
const domainMeta: Record<
  Domain,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: "primary" | "secondary" }
> = {
  "Backend Engineering": { icon: Server, color: "primary" },
  "Cloud & DevOps": { icon: Cloud, color: "secondary" },
  "Data & Messaging": { icon: Database, color: "primary" },
  "Frontend (Supporting)": { icon: Code2, color: "secondary" },
};

/* ============================
   COMPONENT
============================ */
const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          Technical <span className="gradient-text">Stack</span>
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.skills.map((category) => {
            const meta = domainMeta[category.domain as Domain];
            const Icon = meta.icon;
            const color = meta.color;

            return (
              <div
                key={category.domain}
                className="neon-card rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
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

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-md bg-muted text-sm border border-border hover:bg-primary/10 transition-colors"
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