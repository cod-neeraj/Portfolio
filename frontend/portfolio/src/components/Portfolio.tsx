import { useState } from "react";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Interest from "./Interests";
import Contact from "./Contact";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");

  const sections = [
    { id: "about", label: "About", component: <About /> },
    { id: "skills", label: "Skills", component: <Skills /> },
    { id: "education", label: "Education", component: <Education /> },
    { id: "experience", label: "Experience", component: <Experience /> },
    { id: "projects", label: "Projects", component: <Projects /> },
    { id: "certificates", label: "Certificates", component: <Certificates /> },
    { id: "hobbies", label: "Hobbies", component: <Interest /> },
    { id: "contact", label: "Contact", component: <Contact /> },
  ];

  const activeComponent =
    sections.find((section) => section.id === activeSection)?.component ||
    <About />;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}


      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 flex justify-center mt-8 px-4">
        <div className="backdrop-blur-xl bg-background/60 border border-border shadow-lg rounded-full px-6 py-3 flex flex-wrap gap-3 justify-center">

          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
            >
              {section.label}
            </button>
          ))}

        </div>
      </div>

      {/* Dynamic Section Content */}
      <div className="mt-12 transition-all duration-300 ease-in-out">
        {activeComponent}
      </div>

    </div>
  );
};

export default Portfolio;