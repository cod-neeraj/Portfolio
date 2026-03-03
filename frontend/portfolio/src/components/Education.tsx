import React, { useEffect, useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

// Type definition
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
        years: ""
      });
    } catch (err) {
      console.error("Failed to add education:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading education...</p>;

  return (
  <section id="education" className="py-24 px-4 bg-background">
    <div className="container mx-auto max-w-5xl">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight mb-4 animate-fade-in">
          Education
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        </p>
      </div>

      {/* Add Button */}
      {loggedIn && !adding && (
        <div className="flex justify-center mb-10">
          <Button
            onClick={() => setAdding(true)}
            className="rounded-xl px-6 py-5 text-sm font-semibold shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
        
      )}

      {/* Add Education Form */}
      {adding && (
        <div className="bg-card border rounded-2xl p-8 mb-16 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">
            Add Education
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Degree / Qualification"
              value={newEdu.name}
              onChange={(e) => setNewEdu({ ...newEdu, name: e.target.value })}
            />

            <input
              className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Institute Name"
              value={newEdu.instituteName}
              onChange={(e) =>
                setNewEdu({ ...newEdu, instituteName: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Percentage / GPA"
              value={newEdu.percentage}
              onChange={(e) =>
                setNewEdu({ ...newEdu, percentage: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Years (e.g., 2021 – 2025)"
              value={newEdu.years}
              onChange={(e) =>
                setNewEdu({ ...newEdu, years: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleAddEducation}
              className="rounded-xl px-6 py-5 font-medium"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => setAdding(false)}
              className="rounded-xl px-6 py-5"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && education.length === 0 && (
        <div className="text-center py-16 border rounded-2xl bg-muted/30">
          <GraduationCap className="mx-auto mb-4 w-10 h-10 text-muted-foreground" />
          <p className="text-muted-foreground">
            No education details added yet.
          </p>
        </div>
      )}

      {/* Education Cards */}
      <div className="space-y-10">
        {education.map((edu, index) => (
          <div
            key={index}
            className="group border rounded-2xl p-8 bg-card hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

              {/* Left Section */}
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-1">
                    {edu.name}
                  </h3>
                  <p className="text-primary font-medium">
                    {edu.instituteName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {edu.years}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="px-5 py-3 rounded-xl border bg-secondary/10 text-secondary font-semibold self-start">
                GPA / %: {edu.percentage}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);
};

export default Education;
