# Stage 1: 프론트엔드 애플리케이션 빌드
FROM node:16 AS builder
WORKDIR /frontend
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx 설치 및 설정
FROM nginx:latest

# 기본 Nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*

# 사용자 정의 Nginx 설정 복사
COPY ./nginx.conf /etc/nginx/conf.d/

# Nginx 설치
RUN apt-get update && apt-get install -y nginx

# 빌드된 프론트엔드 파일을 Nginx HTML 디렉터리로 복사
COPY --from=builder /frontend/build /usr/share/nginx/html

# 포트 80 노출
EXPOSE 80

# Nginx 시작 
CMD ["nginx", "-g", "daemon off;"]
