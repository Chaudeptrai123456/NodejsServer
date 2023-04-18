FROM node:latest
EXPOSE 8080
WORKDIR  /project
COPY package-lock.json package.json  yarn.lock ./
RUN yarn install 
COPY . .
CMD ["npm","start"]