import React from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/project";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)] hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Top */}
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {project.name}
                </h3>

                {/* 🔥 Tagline */}
                <p className="text-xs text-muted-foreground mb-3">
                  {project.tagline}
                </p>

                {/* 🔥 Description (limit to 2 points) */}
                <ul className="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
                  {project.description.slice(0, 2).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                {/* 🔥 Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <Button size="sm" variant="outline" asChild className="flex-1">
                  <a href={project.githubLink} target="_blank">
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                </Button>


                <Link
                  to={`/project/${project.id}`}
                  className="flex-1 block"
                >
                  <div className="w-full text-center px-3 py-2 bg-secondary rounded-md">
                    Details
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;