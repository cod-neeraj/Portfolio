import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import Interests from "./components/Interests";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App= () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certificates />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;