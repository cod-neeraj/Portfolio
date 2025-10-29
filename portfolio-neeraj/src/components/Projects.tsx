import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github, Plus } from "lucide-react";
import axios from "axios";

// Type definition
interface ProjectItem {
  name: string;
  description: string;
  githubLink: string;
  projectLink: string;
}

const Projects: React.FC = () => {

  const BASE_URL = import.meta.env.VITE_API_URL;
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(() => {
    const stored = localStorage.getItem("loggedIn");
    return stored ? JSON.parse(stored) : false;
  });

  const [adding, setAdding] = useState(false);
  const [newProject, setNewProject] = useState<ProjectItem>({
    name: "",
    description: "",
    githubLink: "",
    projectLink: "",
  });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getProjects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add new project
  const handleAddProject = async () => {
    try {
      await axios.post(`${BASE_URL}/user/addProjects`, newProject,
        { withCredentials: true }
      ); // Replace with your API
      fetchProjects();
      setAdding(false);
      setNewProject({
        name: "",
        description: "",
        githubLink: "",
        projectLink: "",
      });
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading projects...</p>;

  return (
    <section id="projects" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work and personal projects
        </p>

        {/* Add Project Button */}
        {loggedIn && !adding && (
          <div className="text-center mb-8">
            <Button className="flex items-center gap-2" onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </div>
        )}

        {/* Add Project Form */}
        {adding && (
              <div className="p-6 mb-12 bg-white rounded shadow">
            <h3 className="text-xl font-bold mb-4">Add New Project</h3>
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <textarea
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="GitHub Link"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Live Project Link"
              value={newProject.projectLink}
              onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
            />

            <div className="flex gap-2 mt-4">
              <Button
                className="bg-primary text-white hover:bg-primary/80"
                onClick={handleAddProject}
              >
                Submit
              </Button>
              <Button
                className="bg-muted text-black hover:bg-muted/80"
                onClick={() => setAdding(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="group neon-card rounded-xl p-6 hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all hover:scale-105 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
