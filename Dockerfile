FROM node:8.15.1-stretch

WORKDIR /src/tmp
ONBUILD COPY package.json package-lock.json /src/tmp/
ONBUILD RUN npm install && npm cache clean --force
# RUN apk update && apk install build-essential && apk install python && pip install
ONBUILD COPY . /src/tmp
EXPOSE 8080   
CMD ["npm", "run","dev:build"]