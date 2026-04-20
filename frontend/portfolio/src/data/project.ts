export interface Project {
  id: number;
  name: string;
  tagline: string;
  description: string[];
  problem: string;
  approach: string[];
  architecture: string[];
  learnings: string[];
  challenges: string[];
  githubLink: string;
  projectLink: string;
  techStack: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: "QuickDrop - Hyperlocal E-Commerce Platform",
    tagline: "Location-based microservices platform for fast product delivery",

    description: [
      "Built a hyperlocal e-commerce platform connecting users with nearby sellers",
      "Implemented distance-based product filtering within configurable radius (default 5km)",
      "Designed event-driven order processing using Kafka",
      "Developed delivery partner allocation using dynamic ranking algorithm",
    ],

    problem:
      "Traditional e-commerce platforms lack efficient hyperlocal delivery optimization. Needed a system to connect users with nearby sellers and assign delivery partners intelligently for faster fulfillment.",

    approach: [
      "Split system into independent microservices (user, product, order, delivery)",
      "Implemented geo-based filtering to fetch nearby sellers",
      "Used Kafka for asynchronous order processing and service communication",
      "Designed ranking algorithm for delivery partner allocation based on distance and load",
    ],

    architecture: [
      "API Gateway (Spring Cloud Gateway)",
      "Microservices (Spring Boot)",
      "Kafka for event-driven communication",
      "MySQL databases per service",
      "Geo-based query handling for location filtering",
    ],

    learnings: [
      "Designing hyperlocal systems with geo-based filtering",
      "Event-driven architecture using Kafka",
      "Handling asynchronous workflows in distributed systems",
      "Designing scalable delivery allocation logic",
    ],

    challenges: [
      "Implementing accurate distance-based filtering",
      "Ensuring consistency across async services",
      "Designing efficient delivery assignment logic",
      "Handling failures in event-driven flow",
    ],

    githubLink: "https://github.com/cod-neeraj/QuickDrop-Backend.git",
    projectLink: "",

    techStack: ["Spring Boot", "Spring Cloud", "Kafka", "MySQL", "Docker"],
  },
  {
    id: 2,
    name: "AI-Powered Secure API Gateway",
    tagline:
      "Production-grade reactive gateway with AI threat detection and observability",

    description: [
      "Built a secure API Gateway using Spring Cloud Gateway and WebFlux",
      "Implemented JWT authentication, rate limiting, and circuit breaker",
      "Integrated AI-based threat detection using Kafka and Gemini API",
      "Enabled full observability using Prometheus and Grafana",
    ],

    problem:
      "Traditional API gateways handle routing but lack intelligent threat detection and scalable request handling. Needed a system that could handle high traffic, detect malicious requests, and remain resilient under failures.",

    approach: [
      "Used Spring Cloud Gateway as a centralized entry point",
      "Implemented JWT authentication and Redis-based rate limiting",
      "Designed async AI pipeline using Kafka for threat detection",
      "Applied circuit breaker pattern to prevent cascading failures",
    ],

    architecture: [
      "Reactive API Gateway (Spring WebFlux)",
      "Microservices (User, Product, Order)",
      "Kafka-based event streaming for AI processing",
      "Redis for rate limiting, caching, and IP blocking",
      "PostgreSQL databases per service",
      "Observability with Prometheus and Grafana",
    ],

    learnings: [
      "Reactive programming with WebFlux",
      "Designing scalable API Gateway systems",
      "Event-driven architecture using Kafka",
      "Combining rule-based and AI-based security",
      "Implementing observability in distributed systems",
    ],

    challenges: [
      "Handling async communication without blocking requests",
      "Designing efficient rate limiting with Redis",
      "Integrating AI without increasing latency",
      "Debugging distributed system failures",
      "Managing multiple services and infrastructure",
    ],

    githubLink: "https://github.com/cod-neeraj/Api_Gateway.git",
    projectLink: "",

    techStack: [
      "Spring Boot",
      "Spring Cloud Gateway",
      "WebFlux",
      "JWT",
      "Redis",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "Prometheus",
      "Grafana",
      "Gemini AI",
    ],
  },
  {
    id: 3,
    name: "EasyTrade",
    tagline:
      "Full-stack stock trading platform with AI chatbot, real-time NSE data, and automated risk management",

    description: [
      "ChainTrade is a web-based stock trading platform where users can register, fund a virtual wallet, and buy or sell stocks in a realistic simulation environment.",
      "Users manage a live portfolio with real-time P&L calculation, market-cap breakdown (Small / Medium / Large cap), and sector-wise allocation charts.",
      "Stop-loss and stop-gain thresholds can be set per holding; a scheduled background job checks and auto-executes these every minute via a MySQL stored procedure.",
      "An integrated Google Gemini 1.5 Flash chatbot answers trading and finance queries, supporting both plain text and image inputs.",
      "Live NSE India market index data is fetched by scraping the NSE website using Jsoup and displayed on a dedicated Live Market page.",
    ],

    problem:
      "Beginner investors lack a safe, realistic environment to practice stock trading without risking real money. Most simulators are either too basic or too complex, and none combine portfolio analytics, automated risk management, live market data, and AI-guided learning in a single platform.",

    approach: [
      "Implemented session-based authentication with BCrypt password hashing — no full Spring Security filter chain required, keeping setup lightweight.",
      "Enforced strict input validation (email, phone, PAN card format, password strength) using regex-based utility methods in a dedicated Validation class.",
      "Designed a layered MVC architecture: Controllers handle HTTP routing, Services contain all business logic, and DAOs manage database access via Spring JdbcTemplate with custom RowMappers.",
      "Buy/sell transactions validate wallet balance, update portfolio holdings, and dispatch HTML email order confirmations via Gmail SMTP — all within a single service call.",
      "Portfolio P&L, cap-category percentages, and sector breakdowns are computed in-memory in PortfolioService using Java streams over live stock prices fetched from the database.",
      "Registered a @Scheduled cron job (every minute) that calls a MySQL stored procedure to check every user's stop-loss and stop-gain thresholds and execute sells automatically.",
      "Profile picture uploads are stored as SQL BLOBs directly in MySQL and streamed back to the browser through a dedicated controller endpoint.",
    ],

    architecture: [
      "Frontend: Thymeleaf server-side HTML templates with static assets (CSS, JS, images) served from Spring Boot's classpath:/static/ directory.",
      "Backend: Spring Boot 2.7.18 MVC application on port 9000, structured into Controller, Service, DAO, Model, DTO, Mapper, Validation, and Exception packages.",
      "Database: MySQL (database: trading_db_1) accessed via Spring JdbcTemplate; a stored procedure checkStopLossAndGain() handles automated risk management.",
      "Session Management: Spring Session Core stores user objects server-side; no-cache headers on profile/portfolio pages prevent back-button access after logout.",
      "Email: Spring Boot Mail over Gmail SMTP (host: smtp.gmail.com, port 587, STARTTLS) — welcome email on registration, HTML order confirmation on every trade.",
      "AI Chatbot: RestTemplate POST calls to Google Generative Language API (gemini-1.5-flash model) with support for text-only and multipart image+text payloads.",
      "Market Data: Jsoup HTTP client scrapes NSE India homepage to extract index names, values, and percentage changes.",
      "API Docs: Springfox Swagger 2 (v2.9.2) with ant-path-matcher workaround, accessible at /swagger-ui.html.",
      "Exception Handling: @ControllerAdvice GlobalExceptionHandler maps PanCardDuplicateException, StockNotFoundException, SQLException, MessagingException, and IOException to user-facing error views.",
    ],

    learnings: [
      "Implementing the DAO pattern with Spring JdbcTemplate and custom RowMappers to keep SQL completely out of the service layer.",
      "Using @Scheduled with cron expressions to run background tasks inside a Spring Boot application without a separate job scheduler.",
      "Calling the Google Gemini REST API using RestTemplate, including constructing multipart payloads for image + text inputs.",
      "Scraping live HTML data with Jsoup and understanding why selector-based scraping is inherently fragile against site redesigns.",
      "Storing and retrieving binary data (profile pictures) as SQL BLOBs and streaming them directly to the HTTP response with correct Content-Type headers.",
      "Managing HTTP session lifecycle — creating, reading, updating, and invalidating sessions — and setting Cache-Control headers to prevent stale authenticated pages.",
      "Sending HTML emails with MimeMessageHelper over Gmail SMTP, including reading an HTML template file from disk for welcome emails.",
      "Applying BCrypt password hashing via Spring Security Crypto without enabling the full Spring Security filter chain.",
      "Computing portfolio analytics (total invested, current value, P&L, cap/sector breakdown) in-memory using Java 8 streams and collectors.",
    ],

    challenges: [
      "Springfox Swagger 2 is incompatible with Spring Boot 2.6+ default path matching — fixed by setting spring.mvc.pathmatch.matching-strategy=ant-path-matcher in application.properties.",
      "NSE India's homepage is partially JavaScript-rendered; Jsoup only sees the static HTML, so selector targeting required multiple inspection iterations and is still fragile.",
      "Buy/sell operations involve multiple database writes (balance deduction, portfolio update) but no @Transactional boundary — a mid-operation failure can leave the database in an inconsistent state.",
      "Profile picture storage as a BLOB in MySQL with streaming response required careful InputStream handling to avoid loading the entire binary into heap memory.",
      "Gmail SMTP rejected connections until 2-Step Verification was enabled and a dedicated App Password was generated — standard username/password credentials do not work.",
      "The Validation class uses strict regex for PAN card (^[A-Z]{5}\\d{4}[A-Z]$), phone (10-digit, no leading zero), and password (must contain uppercase, lowercase, digit, special char) — mismatches caused silent registration failures that were hard to debug.",
    ],

    githubLink: "https://github.com/cod-neeraj/EasyTrade.git",
    projectLink: "",

    techStack: [
      "Java 17",
      "Spring Boot 2.7.18",
      "Spring MVC",
      "Spring JDBC (JdbcTemplate)",
      "Spring Session Core",
      "Spring Boot Mail",
      "Spring Security Crypto (BCrypt)",
      "Maven",
    ],
  },
  {
    id: 4,
    name: "Robot Shop – Cloud-Native Microservices on AWS EKS",
    tagline:
      "High-throughput Kubernetes deployment with service mesh, autoscaling, and chaos testing",

    description: [
      "Deployed a polyglot microservices application on AWS EKS with 8 services and 3 databases",
      "Configured Istio service mesh for traffic routing and observability",
      "Implemented Horizontal Pod Autoscaler (HPA) and validated scaling using k6 load testing",
      "Built GitOps pipeline using ArgoCD with Helm and Kustomize",
    ],

    problem:
      "Scaling microservices reliably under real-world traffic while maintaining observability and resilience is complex. Needed a system that could handle high load, auto-scale efficiently, and recover from failures.",

    approach: [
      "Deployed services on multi-node EKS cluster with workload isolation using taints and tolerations",
      "Used Istio for intelligent traffic routing and service-level visibility",
      "Performed load testing using k6 to simulate high concurrency",
      "Implemented GitOps-based continuous deployment using ArgoCD",
    ],

    architecture: [
      "AWS EKS Kubernetes cluster",
      "Microservices (polyglot architecture)",
      "Istio service mesh for routing and telemetry",
      "Prometheus + Grafana for observability",
      "HPA for auto-scaling based on CPU metrics",
      "ArgoCD for GitOps deployment",
    ],

    learnings: [
      "Kubernetes workload scheduling and node isolation",
      "Service mesh concepts with Istio",
      "Autoscaling strategies using HPA",
      "Observability and performance bottleneck detection",
      "GitOps workflows with ArgoCD",
    ],

    challenges: [
      "Debugging incorrect Istio routing causing traffic imbalance",
      "Identifying performance bottlenecks under high load",
      "Tuning HPA for optimal scaling behavior",
      "Simulating real-world failures using chaos testing",
    ],

    githubLink: "https://github.com/cod-neeraj/robotShop_deployment.git",
    projectLink: "",

    techStack: [
      "Kubernetes",
      "AWS EKS",
      "Docker",
      "Istio",
      "k6",
      "Prometheus",
      "Grafana",
      "ArgoCD",
      "Helm",
      "Kustomize",
    ],
  },
  {
    id: 5,
    name: "Online Boutique – Scalable Microservices on AWS EKS",
    tagline:
      "Cloud-native e-commerce system with service mesh, autoscaling, and performance optimization",

    description: [
      "Deployed Google Online Boutique microservices application (10+ services) on AWS EKS cluster",
      "Configured Istio service mesh for traffic routing, observability, and fault injection",
      "Implemented Horizontal Pod Autoscaler (HPA) and validated scaling using k6 load testing",
      "Optimized system performance by identifying and resolving service-level bottlenecks",
    ],

    problem:
      "Managing and scaling distributed microservices under real-world traffic requires efficient routing, observability, and fault tolerance. Needed to deploy and optimize a cloud-native system capable of handling high concurrency with minimal latency.",

    approach: [
      "Deployed microservices on multi-node Kubernetes cluster with proper resource allocation",
      "Configured Istio VirtualService and DestinationRules for traffic control",
      "Used k6 to simulate high concurrent users and measure system performance",
      "Analyzed metrics via Prometheus and Grafana to identify bottlenecks and optimize scaling",
    ],

    architecture: [
      "AWS EKS Kubernetes cluster",
      "Microservices (frontend, cart, product catalog, checkout, payment, recommendation)",
      "Istio service mesh for routing and telemetry",
      "Prometheus + Grafana for monitoring",
      "HPA for autoscaling based on CPU usage",
      "Redis for caching and session storage",
    ],

    learnings: [
      "Deploying production-like microservices on Kubernetes",
      "Service mesh concepts and traffic management using Istio",
      "Autoscaling behavior and performance tuning",
      "Observability and debugging distributed systems",
      "Load testing strategies for high-concurrency systems",
    ],

    challenges: [
      "Fixing incorrect traffic routing in Istio configuration",
      "Handling uneven load distribution across services",
      "Identifying and resolving CPU bottlenecks under load",
      "Maintaining low latency during high concurrency",
    ],

    githubLink: "https://github.com/cod-neeraj/k8s-microservices-observability-gcp.git",
    projectLink: "",

    techStack: [
      "Kubernetes",
      "AWS EKS",
      "Docker",
      "Istio",
      "k6",
      "Prometheus",
      "Grafana",
      "Redis",
      "ArgoCD",
    ],
  },
];