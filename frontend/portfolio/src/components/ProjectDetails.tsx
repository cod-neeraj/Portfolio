import { useParams } from "react-router-dom";
import { projectsData } from "../data/project";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();

  const project = projectsData.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="text-center mt-20 text-red-500">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 max-w-4xl mx-auto">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{project.name}</h1>

      {/* Tagline */}
      <p className="text-muted-foreground mb-6">
        {project.tagline}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">
        <Button asChild>
          <a href={project.githubLink} target="_blank">
            <Github className="w-4 h-4 mr-2" />
            View Code
          </a>
        </Button>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Problem */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Problem</h2>
        <p className="text-muted-foreground">{project.problem}</p>
      </section>

      {/* Approach */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Approach</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {project.approach.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Architecture */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Architecture</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {project.architecture.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Learnings */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Key Learnings</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {project.learnings.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Challenges</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {project.challenges.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProjectDetails;