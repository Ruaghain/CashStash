# Create image based on yarn
FROM arhea/yarn:6

# Create directory where app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that all out commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependecy definitions
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Install dependencies
RUN yarn install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs on
EXPOSE 8000

# Serve the application
CMD ["yarn", "run", "start:local-dev"]
