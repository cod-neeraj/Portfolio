import React, { useEffect, useState } from "react";
import { Calendar, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";

interface ExperienceItem {
  id: number;
  jobRole: string;
  company: string;
  time: string;
  experience: string[];
}

const Experience: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  const [newExp, setNewExp] = useState({
    jobRole: "",
    company: "",
    time: "",
  });

  const [descriptionInput, setDescriptionInput] = useState("");

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getExperiences`, {
        withCredentials: true,
      });

      const formatted = res.data.map((exp: any) => ({
        id: exp.id,
        jobRole: exp.jobRole,
        company: exp.company,
        time: exp.time,
        experience: Array.isArray(exp.experience) ? exp.experience : [],
      }));

      setExperiences(formatted);
    } catch (error) {
      console.error("Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddExperience = async () => {
    const points = descriptionInput
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);

    if (!newExp.jobRole || !newExp.company || !newExp.time || points.length === 0) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/user/addExperience`,
        { ...newExp, experience: points },
        { withCredentials: true }
      );

      setAdding(false);
      setNewExp({ jobRole: "", company: "", time: "" });
      setDescriptionInput("");

      fetchExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this experience?")) return;

    try {
      await axios.delete(`${BASE_URL}/user/deleteExperiences/${id}`, {
        withCredentials: true,
      });

      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Work <span className="gradient-text">Experience</span>
        </h2>

        {/* Add Button */}
        {loggedIn && !adding && !loading && (
          <div className="flex justify-center mb-10">
            <Button onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}

        {/* Form */}
        {adding && (
          <div className="neon-card rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6">Add Experience</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary"
                placeholder="Job Role"
                value={newExp.jobRole}
                onChange={(e) =>
                  setNewExp({ ...newExp, jobRole: e.target.value })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary"
                placeholder="Company"
                value={newExp.company}
                onChange={(e) =>
                  setNewExp({ ...newExp, company: e.target.value })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary"
                placeholder="Time"
                value={newExp.time}
                onChange={(e) =>
                  setNewExp({ ...newExp, time: e.target.value })
                }
              />

              <textarea
                className="p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary md:col-span-2"
                placeholder="Each bullet on new line"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddExperience}>Save</Button>
              <Button variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* 🔥 Skeleton Loader (NO BLINK) */}
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="p-6 border border-border rounded-xl animate-pulse">
                <div className="h-5 w-1/3 bg-muted mb-2 rounded"></div>
                <div className="h-4 w-1/2 bg-muted mb-2 rounded"></div>
                <div className="h-3 w-full bg-muted rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="space-y-6 animate-fade-in">
            {experiences.map((exp) => (
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

                  {loggedIn && (
                    <button onClick={() => handleDelete(exp.id)}>
                      <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                    </button>
                  )}
                </div>

                <ul className="mt-4 space-y-1 text-muted-foreground list-disc list-inside">
                  {exp.experience.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;