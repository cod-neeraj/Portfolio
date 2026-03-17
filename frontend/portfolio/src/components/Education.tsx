import React, { useEffect, useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

interface EducationItem {
  name: string;
  instituteName: string;
  percentage: string;
  years: string;
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
      await axios.post(`${BASE_URL}/user/addEducation`, newEdu, {
        withCredentials: true,
      });

      fetchEducation();
      setAdding(false);

      setNewEdu({
        name: "",
        instituteName: "",
        percentage: "",
        years: "",
      });
    } catch (err) {
      console.error("Failed to add education:", err);
    }
  };

  return (
    <section id="education" className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-5xl mx-auto">

        {/* Heading (always visible) */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Education</span>
        </h2>

        {/* Add Button */}
        {loggedIn && !adding && !loading && (
          <div className="flex justify-center mb-10">
            <Button onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}

        {/* Form */}
        {adding && (
          <div className="neon-card rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6">Add Education</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="p-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Degree"
                value={newEdu.name}
                onChange={(e) => setNewEdu({ ...newEdu, name: e.target.value })}
              />

              <input
                className="p-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Institute"
                value={newEdu.instituteName}
                onChange={(e) =>
                  setNewEdu({ ...newEdu, instituteName: e.target.value })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="GPA / %"
                value={newEdu.percentage}
                onChange={(e) =>
                  setNewEdu({ ...newEdu, percentage: e.target.value })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Years"
                value={newEdu.years}
                onChange={(e) =>
                  setNewEdu({ ...newEdu, years: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddEducation}>Save</Button>
              <Button variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* 🔥 Loading Skeleton (NO BLINK) */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl p-6 border border-border animate-pulse"
              >
                <div className="h-5 w-1/3 bg-muted mb-3 rounded"></div>
                <div className="h-4 w-1/2 bg-muted mb-2 rounded"></div>
                <div className="h-3 w-1/4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && education.length === 0 && (
          <div className="text-center py-12 border border-border rounded-2xl bg-muted/30">
            <GraduationCap className="mx-auto mb-4 w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              No education details added yet.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && education.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            {education.map((edu, index) => (
              <div
                key={index}
                className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)]"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">{edu.name}</h3>
                      <p className="text-primary">{edu.instituteName}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.years}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary font-medium">
                    {edu.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Education;