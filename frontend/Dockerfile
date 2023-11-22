# frontend/Dockerfile

# Stage 1: Build React App
FROM node:14.17 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Setup Nginx
FROM nginx:1.21

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy React build files to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html/frontend

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
