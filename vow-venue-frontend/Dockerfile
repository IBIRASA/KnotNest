# Use a minimal Node.js image based on Debian Bookworm (Debian 12) for building
FROM node:20-slim-bookworm AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install frontend dependencies
# Upgrade npm itself to its latest version
RUN npm install --no-cache-dir && npm update -g npm

# Copy the rest of your application code into the working directory
COPY . ./

# Build the React application for production
RUN npm run build

# Use a lightweight Nginx web server to serve the static built files
# nginx:alpine is very small and secure
FROM nginx:alpine

# NEW: Update and upgrade Alpine Linux packages to apply security patches
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
