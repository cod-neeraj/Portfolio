const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center animate-fade-in">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="neon-card rounded-2xl p-8 shadow-lg hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all group">
          <div className="relative">
            {/* Background Glow Effects */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-all"></div>

            {/* Content */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 relative">
              I’m a final-year Software Engineering student focused on building 
              <span className="text-primary font-semibold"> scalable backend systems and cloud-native applications</span>. 
              I enjoy designing clean architectures, writing maintainable code, and solving real-world engineering problems with practical solutions.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6 relative">
              My core strength lies in <span className="text-secondary font-semibold">Java, Spring Boot, and microservices architecture</span>, 
              supported by hands-on experience with Docker, CI/CD pipelines, and cloud deployment. 
              I approach development with a DevOps mindset — thinking beyond just code to reliability, performance, and automation.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed relative">
              I continuously refine my skills through projects, system design exploration, and practical experimentation. 
              My goal is not just to build features, but to engineer systems that are robust, efficient, and production-ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;