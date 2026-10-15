# Stage 1: Build ứng dụng React với Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files và cài đặt dependencies
COPY package*.json ./
RUN npm ci

# Copy toàn bộ mã nguồn và thực hiện build
COPY . .
RUN npm run build

# Stage 2: Serve ứng dụng với Nginx
FROM nginx:alpine

# Tạo cấu hình Nginx hỗ trợ Single Page Application (React Router)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy thư mục build từ stage builder sang Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
