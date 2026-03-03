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

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getProjects`);
       const formatted = res.data.map((exp: any) => ({
        id: exp.id,
        name: exp.name,
        description: exp.description,
        githubLink: exp.githubLink,
        projectLink: exp.projectLink,
      }));
      setProjects(formatted);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ADD PROJECT
  const handleAddProject = async () => {
    try {
      const formattedProject = {
        name: newProject.name,
        description: newProject.descriptionInput
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== ""),
        githubLink: newProject.githubLink,
        projectLink: newProject.projectLink,
      };

      await axios.post(
        `${BASE_URL}/user/addProjects`,
        formattedProject,
        { withCredentials: true }
      );

      await fetchProjects();
      setAdding(false);

      setNewProject({
        name: "",
        descriptionInput: "",
        githubLink: "",
        projectLink: "",
      });
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  // DELETE PROJECT BY ID
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${BASE_URL}/user/deleteProject/${id}`,
        { withCredentials: true }
      );

      // Optimistic update (no full refetch needed)
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  if (loading)
    return <p className="text-center py-10">Loading projects...</p>;

  return (
    <section id="projects" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured Projects
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work
        </p>

        {/* Add Button */}
        {loggedIn && !adding && (
          <div className="text-center mb-8">
            <Button onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        )}

        {/* Add Form */}
        {adding && (
          <div className="p-6 mb-12 bg-card border rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Add New Project</h3>

            <input
              className="w-full mb-3 p-3 border rounded bg-background"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />

            <textarea
              className="w-full mb-3 p-3 border rounded bg-background"
              placeholder="Description (One feature per line)"
              rows={5}
              value={newProject.descriptionInput}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  descriptionInput: e.target.value,
                })
              }
            />

            <input
              className="w-full mb-3 p-3 border rounded bg-background"
              placeholder="GitHub Link"
              value={newProject.githubLink}
              onChange={(e) =>
                setNewProject({ ...newProject, githubLink: e.target.value })
              }
            />

            <input
              className="w-full mb-3 p-3 border rounded bg-background"
              placeholder="Live Project Link"
              value={newProject.projectLink}
              onChange={(e) =>
                setNewProject({ ...newProject, projectLink: e.target.value })
              }
            />

            <div className="flex gap-4 mt-4">
              <Button onClick={handleAddProject}>Submit</Button>
              <Button variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id} // FIXED
              className="group border rounded-xl p-6 bg-card shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">
                  {project.name}
                </h3>

                {loggedIn && (
                  <button
                    onClick={() => handleDelete(project.id)} // FIXED
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
                {project.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                </Button>

                <Button size="sm" asChild className="flex-1">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
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