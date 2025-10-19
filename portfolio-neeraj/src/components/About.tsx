const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center animate-fade-in">
          About <span className="gradient-text">Me</span>
        </h2>
        
        <div className="neon-card rounded-2xl p-8 shadow-lg hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all group">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-all"></div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 relative">
              I'm a final year software engineering student with a passion for creating elegant solutions to complex problems. 
              My journey in tech started with curiosity and has evolved into a deep commitment to building impactful applications.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 relative">
              I specialize in <span className="text-primary font-semibold">full-stack development</span>, with expertise in modern web technologies. I'm constantly learning and 
              exploring new tools to stay at the forefront of technology.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed relative">
              When I'm not coding, you'll find me contributing to <span className="text-secondary font-semibold">open-source projects</span>, reading tech blogs, or experimenting 
              with new frameworks and languages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;