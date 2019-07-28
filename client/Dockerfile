# Create image based on yarn
FROM mhart/alpine-node:12

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache bash chromium@edge nss@edge

# This line is to tell karma-chrome-launcher where
# chromium was downloaded and installed to.
ENV CHROME_BIN /usr/bin/chromium-browser

# Tell Puppeteer to skip installing Chrome.
# We'll be using the installed package instead.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Create directory where app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that all out commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependecy definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependencies
RUN npm install --ignore-engines

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs on
EXPOSE 8000

# Serve the application
CMD ["npm", "run", "start"]
