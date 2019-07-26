FROM mhart/alpine-node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN yarn install --ignore-engines

COPY . /usr/src/app

EXPOSE 3000

CMD ["yarn", "run", "start"]
