
FROM node:16-alpine

WORKDIR /var/www/localhost/htdocs

COPY BACK/package.json .

RUN yarn


COPY . . 

EXPOSE 5150

CMD yarn start