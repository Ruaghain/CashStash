FROM arhea/yarn:6

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN yarn install

COPY . /usr/src/app

EXPOSE 4000

CMD ["yarn", "run", "start"]
