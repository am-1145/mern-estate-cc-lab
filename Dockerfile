FROM node:lts-alpine

WORKDIR .
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
