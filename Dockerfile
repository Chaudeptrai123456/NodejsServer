FROM node:latest
EXPOSE 8080
WORKDIR  /app
COPY package-lock.json package.json ./
RUN npm install
COPY . .
CMD ["npm start"]