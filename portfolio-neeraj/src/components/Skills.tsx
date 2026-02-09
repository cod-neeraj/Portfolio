import React from "react";
import { Server, Layout, Zap, Code2 } from "lucide-react";

/* ============================
   DOMAIN TYPES
============================ */
type Domain =
  | "Backend Engineering"
  | "DevOps & Cloud"
  | "Data, Messaging & Security"
  | "Frontend Development";

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
        "Microservices Architecture",
        "PostgreSQL",
        "SQL",
        "JWT Authentication",
        "Express.js",
      ],
    },
    {
      domain: "DevOps & Cloud",
      skills: [
        "Linux",
        "Shell Scripting",
        "Docker",
        "Docker Compose",
        "Kubernetes",
        "Jenkins",
        "GitHub Actions",
        "CI/CD Pipelines",
        "AWS",
        "Terraform",
        "Logging & Monitoring",
      ],
    },
    {
      domain: "Data, Messaging & Security",
      skills: [
        "Apache Kafka",
        "Redis",
        "JSON",
        "REST APIs",
        "Database Design",
        "API Integration",
      ],
    },
    {
      domain: "Frontend Development",
      skills: [
        "React",
        "TypeScript",
        "HTML5",
        "Tailwind CSS",
        "Responsive UI Design",
        "Frontend-Backend Integration",
      ],
    },
  ],
};

/* ============================
   DOMAIN META (ICONS & COLORS)
============================ */
const domainMeta: Record<
  Domain,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: "primary" | "secondary" }
> = {
  "Backend Engineering": { icon: Server, color: "secondary" },
  "DevOps & Cloud": { icon: Layout, color: "primary" },
  "Data, Messaging & Security": { icon: Zap, color: "secondary" },
  "Frontend Development": { icon: Code2, color: "primary" },
};

/* ============================
   COMPONENT
============================ */
const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Technical <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Backend-focused engineer with DevOps mindset and frontend delivery capability
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.skills.map((category, index) => {
            const meta = domainMeta[category.domain as Domain];
            const Icon = meta.icon;
            const color = meta.color;

            return (
              <div
                key={category.domain}
                className="neon-card rounded-xl p-6 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all hover:scale-105 hover:-translate-y-2 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${
                      color === "primary"
                        ? "from-primary/20 to-primary/10"
                        : "from-secondary/20 to-secondary/10"
                    } border-2 ${
                      color === "primary"
                        ? "border-primary/40"
                        : "border-secondary/40"
                    } group-hover:scale-110 transition-transform`}
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
                      className="px-3 py-1.5 rounded-full bg-muted/70 text-sm border-2 border-primary/20 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_10px_hsl(var(--primary)/0.4)] transition-all cursor-default"
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