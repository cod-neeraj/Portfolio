# Step 1: Build stage using Maven
FROM maven:3.9.9-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml first 
COPY pom.xml .

# download dependencies 
RUN mvn -B dependency:resolve dependency:resolve-plugins

# Copy source code
COPY src ./src

# Build the project and package it as a jar
RUN mvn clean package -DskipTests

# Step 2: Runtime stage using lightweight JRE
FROM eclipse-temurin:21-jre

# Set working directory
WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your app runs on (default 8080)
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
