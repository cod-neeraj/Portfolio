import React, { useEffect, useState } from "react";
import {Calendar, Plus, Trash2 } from "lucide-react";
import axios from "axios";

// ============================
// Type Definitions
// ============================

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

  // ============================
  // Fetch Experiences
  // ============================

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getExperiences`, {
        withCredentials: true,
      });

      console.log("Fetched experiences:", res.data);

      const formatted = res.data.map((exp: any) => ({
        id: exp.id,
        jobRole: exp.jobRole,
        company: exp.company,
        time: exp.time,
        experience: Array.isArray(exp.experience)
          ? exp.experience
          : [],
      }));

      setExperiences(formatted);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // ============================
  // Add Experience
  // ============================

  const handleAddExperience = async () => {
    const formattedPoints = descriptionInput
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (
      !newExp.jobRole ||
      !newExp.company ||
      !newExp.time ||
      formattedPoints.length === 0
    ) {
      alert("All fields and at least one bullet point are required.");
      return;
    }

    const payload = {
      ...newExp,
      experience: formattedPoints,
    };

    try {
      await axios.post(`${BASE_URL}/user/addExperience`, payload, {
        withCredentials: true,
      });

      setAdding(false);
      setNewExp({ jobRole: "", company: "", time: "" });
      setDescriptionInput("");

      fetchExperiences();
    } catch (error) {
      console.error("Failed to add experience:", error);
    }
  };

  // ============================
  // Delete Experience
  // ============================

  const handleDelete = async (id: number) => {
    console.log("Deleting experience ID:", id);

    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;
    console.log("Confirmed deletion for ID:", id);

    try {
      await axios.delete(
        `${BASE_URL}/user/deleteExperiences/${id}`,
        { withCredentials: true }
      );

      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  if (loading)
    return <p className="text-center py-10">Loading experiences...</p>;

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Work <span className="gradient-text">Experience</span>
        </h2>

        {/* Add Button */}
        {loggedIn && !adding && (
          <div className="text-center mb-8">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white"
              onClick={() => setAdding(true)}
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}

        {/* Add Form */}
        {adding && (
          <div className="p-6 mb-12 bg-white rounded shadow">
            <h3 className="text-xl font-bold mb-4">Add New Experience</h3>

            <input
              className="w-full mb-2 p-2 border bg-black text-white rounded"
              placeholder="Job Role"
              value={newExp.jobRole}
              onChange={(e) =>
                setNewExp({ ...newExp, jobRole: e.target.value })
              }
            />

            <input
              className="w-full mb-2 p-2 border bg-black text-white rounded"
              placeholder="Company"
              value={newExp.company}
              onChange={(e) =>
                setNewExp({ ...newExp, company: e.target.value })
              }
            />

            <input
              className="w-full mb-2 p-2 border bg-black text-white rounded"
              placeholder="Time Period"
              value={newExp.time}
              onChange={(e) =>
                setNewExp({ ...newExp, time: e.target.value })
              }
            />

            <textarea
              className="w-full mb-2 p-2 border bg-black text-white rounded"
              placeholder="Write each bullet on new line"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />

            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-primary text-white"
                onClick={handleAddExperience}
              >
                Submit
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-muted text-black"
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="neon-card rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{exp.jobRole}</h3>
                  <p className="gradient-text font-semibold">
                    {exp.company}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exp.time}</span>
                  </div>
                </div>

                {loggedIn && (
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-500 hover:text-red-700 relative z-50"
                    style={{ pointerEvents: "auto" }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-4">
                {exp.experience.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;