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

  // Fetch certificates
  const fetchCertificates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getCertificates`, {
        withCredentials: true,
      });
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

  // View certificate (generate fresh signed URL)
  const handleView = async (id: number) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/viewCertificate/${id}`,
        { withCredentials: true }
      );

      const signedUrl = res.data;
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error opening certificate:", err);
    }
  };

  // Delete certificate
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${BASE_URL}/user/deleteCertificate/${id}`,
        { withCredentials: true }
      );

      // Remove locally (no refetch needed)
      setCertificates((prev) =>
        prev.filter((cert) => cert.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete certificate:", err);
    }
  };

  // Add certificate
  const handleAddCertificate = async () => {
    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newCert.name);
      formData.append("instituteName", newCert.instituteName);
      formData.append("certificateDate", newCert.date);
      formData.append("certificate", file);

      await axios.post(
        `${BASE_URL}/user/addCertificate`,
        formData,
        { withCredentials: true }
      );

      // Refresh list
      await fetchCertificates();

      // Reset form
      setAdding(false);
      setFile(null);
      setNewCert({
        name: "",
        instituteName: "",
        date: "",
      });
    } catch (err) {
      console.error("Failed to add certificate:", err);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-10">
        Loading certificates...
      </p>
    );
  }

  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Certificates
        </h2>

        {/* Add Button */}
        {!adding && (
          <div className="text-center mb-8">
            <Button onClick={() => setAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </div>
        )}

        {/* Add Form */}
        {adding && (
          <div className="p-6 mb-12 bg-white rounded shadow">
            <input
              className="w-full p-2 border mb-2"
              placeholder="Certificate Name"
              value={newCert.name}
              onChange={(e) =>
                setNewCert({ ...newCert, name: e.target.value })
              }
            />

            <input
              className="w-full p-2 border mb-2"
              placeholder="Institute Name"
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
              className="w-full p-2 border mb-2"
              value={newCert.date}
              onChange={(e) =>
                setNewCert({ ...newCert, date: e.target.value })
              }
            />

            <input
              type="file"
              accept="application/pdf"
              className="w-full p-2 border mb-4"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />

            <div className="flex gap-4">
              <Button onClick={handleAddCertificate}>
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={() => setAdding(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 border rounded shadow bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-lg">
                  {cert.name}
                </h3>
              </div>

              <p className="text-sm mb-1">
                {cert.instituteName}
              </p>
              <p className="text-sm mb-3">
                Date: {cert.date}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(cert.id)}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(cert.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;