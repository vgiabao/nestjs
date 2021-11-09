FROM node:16.13

WORKDIR /bee/src/app

COPY package*.json ./

RUN npm install


#bundle app source
COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main.js"]
