import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github, Plus, Trash2 } from "lucide-react";
import axios from "axios";

interface ProjectItem {
  id: number;
  name: string;
  description: string[];
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

  const [newProject, setNewProject] = useState({
    name: "",
    descriptionInput: "",
    githubLink: "",
    projectLink: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getProjects`);
      const formatted = res.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        githubLink: p.githubLink,
        projectLink: p.projectLink,
      }));
      setProjects(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    const formatted = {
      name: newProject.name,
      description: newProject.descriptionInput
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l),
      githubLink: newProject.githubLink,
      projectLink: newProject.projectLink,
    };

    try {
      await axios.post(`${BASE_URL}/user/addProjects`, formatted, {
        withCredentials: true,
      });

      fetchProjects();
      setAdding(false);

      setNewProject({
        name: "",
        descriptionInput: "",
        githubLink: "",
        projectLink: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete project?")) return;

    try {
      await axios.delete(`${BASE_URL}/user/deleteProject/${id}`, {
        withCredentials: true,
      });

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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

        {/* Add Button */}
        {loggedIn && !adding && !loading && (
          <div className="flex justify-center mb-10">
            <Button onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        )}

        {/* Form */}
        {adding && (
          <div className="neon-card rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6">Add Project</h3>

            <div className="space-y-4">
              <input
                className="p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary w-full"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
              />

              <textarea
                className="p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary w-full"
                rows={5}
                placeholder="Description (one per line)"
                value={newProject.descriptionInput}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    descriptionInput: e.target.value,
                  })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border w-full"
                placeholder="GitHub Link"
                value={newProject.githubLink}
                onChange={(e) =>
                  setNewProject({ ...newProject, githubLink: e.target.value })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border w-full"
                placeholder="Live Link"
                value={newProject.projectLink}
                onChange={(e) =>
                  setNewProject({ ...newProject, projectLink: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddProject}>Save</Button>
              <Button variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* 🔥 Skeleton Loader */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border border-border rounded-xl animate-pulse">
                <div className="h-5 w-1/2 bg-muted mb-3 rounded"></div>
                <div className="h-4 w-full bg-muted mb-2 rounded"></div>
                <div className="h-4 w-3/4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {projects.map((project) => (
              <div
                key={project.id}
                className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)] hover:-translate-y-1"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold">{project.name}</h3>

                  {loggedIn && (
                    <button onClick={() => handleDelete(project.id)}>
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </button>
                  )}
                </div>

                <ul className="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
                  {project.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <a href={project.githubLink} target="_blank">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>

                  <Button size="sm" asChild className="flex-1">
                    <a href={project.projectLink} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;