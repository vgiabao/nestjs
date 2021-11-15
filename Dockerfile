FROM node:16.13

WORKDIR /bee/src/app

COPY package*.json ./

#bundle app source
COPY . .
CMD ["npm", "íntall"]
EXPOSE 8080
