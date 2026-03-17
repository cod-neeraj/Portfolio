const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="gradient-text">Me</span>
        </h2>

        {/* Card */}
        <div className="neon-card rounded-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)]">

          {/* Content */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">

            <p>
              I’m a final-year Software Engineering student focused on backend
              development and cloud infrastructure. I enjoy understanding how
              systems work under the hood — from API design and database
              optimization to deployment and monitoring.
            </p>

            <p>
              My primary stack includes{" "}
              <span className="text-primary font-semibold">
                Java and Spring Boot
              </span>
              , where I build REST APIs, implement authentication, manage
              relational databases, and structure applications using clean
              architecture principles. I also containerize applications with
              Docker and explore CI/CD workflows to automate deployments.
            </p>

            <p>
              I actively experiment with{" "}
              <span className="text-primary font-semibold">
                cloud services and DevOps tools
              </span>{" "}
              like AWS and infrastructure as code. My goal is to grow into a
              backend engineer who can design reliable, production-ready systems
              — not just implement features.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;