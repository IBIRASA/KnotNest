# Use a minimal Node.js image based on Debian Bookworm (Debian 12) for building
FROM node:20-slim-bookworm AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install frontend dependencies
# Use --no-cache-dir to prevent npm from caching packages, reducing image size
# Upgrade npm itself to its latest version
RUN npm install --no-cache-dir && npm update -g npm

# Copy the rest of your application code into the working directory
COPY . ./

# Build the React application for production
# This command uses the REACT_APP_API_BASE_URL environment variable
# which is passed during the GitHub Actions build step.
RUN npm run build

# Use a lightweight web server to serve the static built files
# Nginx is a common choice for serving static React apps
FROM nginx:alpine

# Update and upgrade Alpine Linux packages to apply security patches
# Corrected syntax for chained RUN command
RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/*

# Copy the built React app from the previous stage
# The 'default.conf' file is custom to serve React's index.html
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
