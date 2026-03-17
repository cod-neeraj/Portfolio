import React, { useEffect, useState } from "react";
import { Award, ExternalLink, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

interface Certificate {
  id: number;
  name: string;
  instituteName: string;
  date: string;
}

const Certificates: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [newCert, setNewCert] = useState({
    name: "",
    instituteName: "",
    date: "",
  });

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getCertificates`, {
        withCredentials: true,
      });
      setCertificates(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleView = async (id: number) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/viewCertificate/${id}`,
        { withCredentials: true }
      );

      window.open(res.data, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete certificate?")) return;

    try {
      await axios.delete(`${BASE_URL}/user/deleteCertificate/${id}`, {
        withCredentials: true,
      });

      setCertificates((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCertificate = async () => {
    if (!file) {
      alert("Upload PDF");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newCert.name);
      formData.append("instituteName", newCert.instituteName);
      formData.append("certificateDate", newCert.date);
      formData.append("certificate", file);

      await axios.post(`${BASE_URL}/user/addCertificate`, formData, {
        withCredentials: true,
      });

      fetchCertificates();
      setAdding(false);
      setFile(null);
      setNewCert({ name: "", instituteName: "", date: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-card/20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Certificates</span>
        </h2>

        {/* Add Button */}
        {!adding && !loading && (
          <div className="flex justify-center mb-10">
            <Button onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </div>
        )}

        {/* Form */}
        {adding && (
          <div className="neon-card rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6">
              Add Certificate
            </h3>

            <div className="space-y-4">
              <input
                className="p-3 rounded-lg bg-background border border-border w-full focus:ring-2 focus:ring-primary"
                placeholder="Certificate Name"
                value={newCert.name}
                onChange={(e) =>
                  setNewCert({ ...newCert, name: e.target.value })
                }
              />

              <input
                className="p-3 rounded-lg bg-background border border-border w-full"
                placeholder="Institute"
                value={newCert.instituteName}
                onChange={(e) =>
                  setNewCert({
                    ...newCert,
                    instituteName: e.target.value,
                  })
                }
              />

              <input
                type="date"
                className="p-3 rounded-lg bg-background border border-border w-full"
                value={newCert.date}
                onChange={(e) =>
                  setNewCert({ ...newCert, date: e.target.value })
                }
              />

              <input
                type="file"
                accept="application/pdf"
                className="p-3 rounded-lg bg-background border border-border w-full"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddCertificate}>Save</Button>
              <Button variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* 🔥 Skeleton (no blink) */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 border border-border rounded-xl animate-pulse"
              >
                <div className="h-5 w-1/2 bg-muted mb-2 rounded"></div>
                <div className="h-4 w-3/4 bg-muted mb-2 rounded"></div>
                <div className="h-3 w-1/3 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="neon-card rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)] hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">{cert.name}</h3>
                </div>

                <p className="text-muted-foreground text-sm">
                  {cert.instituteName}
                </p>

                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  {cert.date}
                </p>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(cert.id)}
                    className="flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(cert.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
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

export default Certificates;