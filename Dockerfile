# 第一阶段：开发环境
FROM node:18.16.0 AS development

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露应用程序的端口
# EXPOSE 8080

# 运行开发服务器
# CMD ["npm", "run", "dev"]

# 第二阶段：构建阶段
# FROM node:18.16.0 AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # 第三阶段：生产环境
# FROM nginx:alpine AS production

# # 复制 build 阶段生成的文件到 Nginx 目录
# COPY --from=build /app/dist /usr/share/nginx/html

# # 暴露 Nginx 端口
# EXPOSE 80

# # 启动 Nginx
# CMD ["nginx", "-g", "daemon off;"]