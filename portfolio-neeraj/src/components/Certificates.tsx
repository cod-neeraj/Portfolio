import React, { useEffect, useState } from "react";
import { Award, ExternalLink, Plus } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";


interface Certificate {
  name: string;
  instituteName: string;
  percentage: string;
  certificateId: string;
  certificateLink: string;
}

const Certificates: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(() => {
    const stored = localStorage.getItem("loggedIn");
    return stored ? JSON.parse(stored) : false;
  });

  const [adding, setAdding] = useState(false);
  const [newCert, setNewCert] = useState<Certificate>({
    name: "",
    instituteName: "",
    percentage: "",
    certificateId: "",
    certificateLink: "",
  });

  const fetchCertificates = async () => {
    try {

      const res = await axios.get(
        `${BASE_URL}/user/getCertificates`
      );
      setCertificates(res.data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Add new certificate
  const handleAddCertificate = async () => {
    try {
      await axios.post(
        `${BASE_URL}/user/addCertificate`,
        newCert,
        { withCredentials: true }
      );

      fetchCertificates();
      setAdding(false);
      setNewCert({
        name: "",
        instituteName: "",
        percentage: "",
        certificateId: "",
        certificateLink: "",
      });
    } catch (err) {
      console.error("Failed to add certificate:", err);
    }
  };


  if (loading) return <p className="text-center py-10">Loading certificates...</p>;

  return (
    <section id="certificates" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Certificates & <span className="gradient-text">Credentials</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Professional certifications and completed courses
        </p>

        {/* Add button */}
        {loggedIn && !adding && (
          <div className="text-center mb-8">
            <Button
              className="flex items-center gap-2"
              onClick={() => setAdding(true)}
            >
              <Plus className="w-4 h-4" /> Add Certificate
            </Button>
          </div>
        )}

        {/* Add Certificate Form */}
        {adding && (
          <div className="p-6 mb-12 bg-white rounded shadow">
            <h3 className="text-xl font-bold mb-4">Add New Certificate</h3>
            <input 
            className="w-full p-2 border bg-black rounded mb-2"
             placeholder="Certificate Name" 
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Institute Name"
              value={newCert.instituteName}
              onChange={(e) =>
                setNewCert({ ...newCert, instituteName: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Percentage / Score"
              value={newCert.percentage}
              onChange={(e) =>
                setNewCert({ ...newCert, percentage: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Certificate ID"
              value={newCert.certificateId}
              onChange={(e) =>
                setNewCert({ ...newCert, certificateId: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border bg-black rounded"
              placeholder="Certificate Link"
              value={newCert.certificateLink}
              onChange={(e) =>
                setNewCert({ ...newCert, certificateLink: e.target.value })
              }
            />

            <div className="flex gap-2 mt-4">
              <Button
                className="bg-primary text-white hover:bg-primary/80"
                onClick={handleAddCertificate}
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

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.certificateId}
              className="neon-card rounded-xl p-6 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.3)] transition-all hover:scale-105 hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.3)] group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 leading-tight group-hover:text-primary transition-colors">{cert.name}</h3>
                  <p className="text-sm text-secondary font-semibold">{cert.instituteName}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2">Score: {cert.percentage}</p>
              <p className="text-xs text-muted-foreground mb-4 font-mono bg-muted/30 p-2 rounded border border-primary/10">ID: {cert.certificateId}</p>

              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" /> View Certificate
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
