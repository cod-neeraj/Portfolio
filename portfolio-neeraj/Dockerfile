# frontend/Dockerfile

# environment for react to compile and all
FROM node:20-alpine AS build 

# making directory and setting it as working directory
WORKDIR /app

# copying package.json and package-lock.json and installing dependencies
COPY package*.json ./

# installing dependencies
RUN npm install

# copying all files and building the react app
COPY . .

# building the react app
RUN npm run build

# Serve the build with nginx
FROM nginx:alpine

# copying the build files from the previous stage to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# exposing port 80 and starting nginx server
EXPOSE 80

# starting nginx server
CMD ["nginx", "-g", "daemon off;"]
