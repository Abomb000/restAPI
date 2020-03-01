#FROM node:alpine
FROM node:10

WORKDIR '/var/www/app'

COPY app/package.json ./

RUN npm install

COPY app .

CMD ["npm","start"]