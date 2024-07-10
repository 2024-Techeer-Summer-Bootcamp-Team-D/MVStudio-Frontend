FROM node:16-alpine
WORKDIR /MVStudio-Frontend
COPY . ./
RUN npm install
RUN npm run build