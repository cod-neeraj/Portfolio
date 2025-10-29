import React, { useEffect, useState } from "react";
import { Briefcase, Calendar, Plus } from "lucide-react";
import axios from "axios";

// Type definitions
interface ExperienceItem {
  jobRole: string;
  company: string;
  time: string;
  experience: string;
  achievements: string;
}

const Experience: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(() => {
    const stored = localStorage.getItem("loggedIn");
    return stored ? JSON.parse(stored) : false;
  });

  // State for adding new experience
  const [newExp, setNewExp] = useState<ExperienceItem>({
    jobRole: "",
    company: "",
    time: "",
   experience: "",
    achievements: "", 
  });
  const [adding, setAdding] = useState(false);

  // Fetch experiences from backend
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getExperiences`);
      setExperiences(res.data);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddExperience = async () => {
    try {
      console.log(newExp);
      await axios.post(`${BASE_URL}/user/addExperience`, newExp, { withCredentials: true }); 
      fetchExperiences(); 
      setAdding(false);
      setNewExp({
        jobRole: "",
        company: "",
        time: "",
        experience: "",
        achievements: "",
      });
    } catch (error) {
      console.error("Failed to add experience:", error);
    }
  };

  if (loading) return <p className="text-center py-10">Loading experiences...</p>;

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          My professional journey and key contributions
        </p>

        {/* Add button */}
        {loggedIn && !adding && (
          <div className="text-center mb-8">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-all"
              onClick={() => setAdding(true)}
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}

        {/* Add Experience Form */}
        {adding && (
           <div className="p-6 mb-12 bg-white rounded shadow">
            <h3 className="text-xl font-bold mb-4">Add New Experience</h3>
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Title"
              value={newExp.jobRole}
              onChange={(e) => setNewExp({ ...newExp, jobRole: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Company"
              value={newExp.company}
              onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Period"
              value={newExp.time}
              onChange={(e) => setNewExp({ ...newExp, time: e.target.value })}
            />
            <textarea
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Description"
              value={newExp.experience}
              onChange={(e) => setNewExp({ ...newExp, experience: e.target.value })}
            />
            <textarea
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Achievements (separate using ';')"
              value={newExp.achievements}
              onChange={(e) => setNewExp({ ...newExp, achievements: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mb-2">
              Example: Led team project; Optimized backend API; Won hackathon
            </p>

            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-all"
                onClick={handleAddExperience}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-muted text-black hover:bg-muted/80 transition-all"
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company + index}
                className={`relative flex flex-col md:flex-row gap-8 animate-fade-in ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-[7px] md:-translate-x-2 animate-glow-pulse"></div>

                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="neon-card rounded-xl p-6 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all ml-8 md:ml-0 group">
                    <div className="flex items-center gap-2 mb-2 justify-start md:justify-start">
                      <div className="p-2 rounded-lg bg-primary/10 border-2 border-primary/40 shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.jobRole}</h3>
                    </div>

                    <p className="text-lg gradient-text font-semibold mb-2">{exp.company}</p>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4 justify-start md:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.time}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.experience}</p>

                    <ul className="space-y-2 text-left">
                      {(exp.achievements || "")
                        .split(";")
                        .map((achievement) => achievement.trim())
                        .filter((achievement) => achievement.length > 0)
                        .map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 font-bold">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
