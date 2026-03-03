const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center gap-8 text-sm font-medium">
        <a href="#about" className="hover:text-primary transition">About</a>
        <a href="#skills" className="hover:text-primary transition">Skills</a>
        <a href="#education" className="hover:text-primary transition">Education</a>
        <a href="#experience" className="hover:text-primary transition">Experience</a>
        <a href="#projects" className="hover:text-primary transition">Projects</a>
        <a href="#certificates" className="hover:text-primary transition">Certificates</a>
        <a href="#hobbies" className="hover:text-primary transition">Hobbies</a>
        <a href="#contact" className="hover:text-primary transition">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;