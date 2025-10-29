import React, { useEffect, useState } from "react";
import { GraduationCap, Award, Plus } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

// Type definition
interface EducationItem {
  name: string;
  instituteName: string;
  percentage: string;
  years: string;
  achievements: string;
}

const Education: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(() => {
    const stored = localStorage.getItem("loggedIn");
    return stored ? JSON.parse(stored) : false;
  });

  const [adding, setAdding] = useState(false);

  const [newEdu, setNewEdu] = useState<EducationItem>({
    name: "",
    instituteName: "",
    percentage: "",
    years: "",
    achievements: "",
  });

  const fetchEducation = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getEducation`);
      setEducation(res.data);
    } catch (err) {
      console.error("Failed to fetch education:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleAddEducation = async () => {
    try {
      console.log(newEdu);
      await axios.post(
        `${BASE_URL}/user/addEducation`,
        newEdu, // send achievements as string
        { withCredentials: true }
      );
      fetchEducation();
      setAdding(false);
      setNewEdu({
        name: "",
        instituteName: "",
        percentage: "",
        years: "",
        achievements: "",
      });
    } catch (err) {
      console.error("Failed to add education:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading education...</p>;

  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="gradient-text">Education</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          My academic journey and achievements
        </p>

        {/* Add Button */}
        {loggedIn && !adding && (
          <div className="text-center mb-8">
            <Button
              className="flex items-center gap-2"
              onClick={() => setAdding(true)}
            >
              <Plus className="w-4 h-4" /> Add Education
            </Button>
          </div>
        )}

        {/* Add Education Form */}
        {adding && (
          <div className="p-6 mb-12 bg-white rounded shadow">
            <h3 className="text-xl font-bold mb-4">Add New Education</h3>
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Degree / Name"
              value={newEdu.name}
              onChange={(e) => setNewEdu({ ...newEdu, name: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Institute Name"
              value={newEdu.instituteName}
              onChange={(e) =>
                setNewEdu({ ...newEdu, instituteName: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Percentage / GPA"
              value={newEdu.percentage}
              onChange={(e) =>
                setNewEdu({ ...newEdu, percentage: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Years (e.g., 2019 - 2023)"
              value={newEdu.years}
              onChange={(e) =>
                setNewEdu({ ...newEdu, years: e.target.value })
              }
            />

            {/* Achievements textarea */}
            <div className="mb-2">
              <textarea
                className="w-full mb-2 p-2 border bg-black rounded"
                placeholder="Achievements (separate using ';')"
                value={newEdu.achievements}
                onChange={(e) =>
                  setNewEdu({ ...newEdu, achievements: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Example: Won coding hackathon; Secured AIR 120 in GATE; Built cloud infra
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                className="bg-primary text-white hover:bg-primary/80"
                onClick={handleAddEducation}
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

        {/* Education List */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="neon-card rounded-xl p-8 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all animate-fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.3)] group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {edu.name}
                    </h3>
                    <p className="text-lg gradient-text font-semibold mb-1">
                      {edu.instituteName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.years}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 text-secondary font-bold self-start shadow-[0_0_10px_hsl(var(--secondary)/0.3)]">
                  GPA / %: {edu.percentage}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm text-accent">
                    Key Achievements:
                  </span>
                </div>
                <ul className="space-y-1 ml-6">
                  {(edu.achievements || "")
                    .split(";")
                    .map((achievement) => achievement.trim())
                    .filter((achievement) => achievement.length > 0)
                    .map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1 font-bold">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))
                  }

                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
