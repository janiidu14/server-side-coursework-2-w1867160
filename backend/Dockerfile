FROM node:18

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "run", "dev"]
