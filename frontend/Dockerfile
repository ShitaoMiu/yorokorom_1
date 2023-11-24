# Build Stage
FROM node:14-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx configuration file (to avoid conflicts with custom settings)
RUN rm /etc/nginx/conf.d/default.conf

# Add custom Nginx configuration file
COPY nginx-custom.conf /etc/nginx/conf.d/

# Expose port 80 to the outside world
EXPOSE 80

# Command to run on container start
CMD ["nginx", "-g", "daemon off;"]
