# CashStash

[![Codeship Status for Ruaghain/CashStash](https://app.codeship.com/projects/167f0130-f551-0134-aab4-4e76bd6b2464/status?branch=master)](https://app.codeship.com/projects/210216)

`CashStash` is a light-weight, money tracking application that will track day to day wallet expenses and bank transactions.

## Development

`CashStash` uses `Docker` to deploy the several containers that it needs to run. They include:

  * mongo
  * express
  * angular

As you can infer from above, it makes use of `MongoDB` as the database engine, `Express` as the web server, and `Angular 5` as the front-end. 
By default runs on port `3000`. 

### Setup

 To get `CashStash` working on an environment, you will have to install the community edition of [Docker](https://www.docker.com/community-edition). 
 Once this has been done, follow the steps outlined below for your OS to get it up and running.

 #### Linux
 
 Run the following command:
 
 * `docker-compose up`
 
 #### MacOS

 Navigate to the project root directory. Modify the `.env` file and set `DOCKER_HOST_IP` to `localhost`. 
 Run the following command:

  * `docker-compose up`

 Once the setup has completed, navigate to `http://localhost:8000`

 #### Windows

 Getting docker working on MS (Pre Windows 10) takes a bit more work. To get it working, do the following:

  * Run `docker-machine start`
  * When that's completed, run `docker-machine env`
  * Once that's completed, run the following: `@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i` This sets the 
    required environment variables needed to get the docker machine working.
  * Finally, when you've done that, run `docker-compose up`  

 If you make any changes to the code, and you'd like those reflected in the container, run the following:

  * `docker-compose up --build`

 The `--build` rebuilds all the source, and deploys it to the container.

### Swagger

The server deploys swagger for ease of use, and for documentation purposes. Once the server is up you'll automatically have access to it.
Navigate to `http://localhost:3000/api/v1/`, and you'll be presented with the SwaggerUI, and have access to the relevant REST endpoints.

### Debugging

 Since you can't easily debug remotely, the easiest way to do it would be to get everything (except MongoDB) running locally without using Docker. 
 To do that, do the following:

  * Install `Node` for your OS
  * Install `yarn` for your relevant OS.
  * Run`yarn install` in both the `client` and `server` directories.
  * From the source root directory run: `docker-compose up mongo` (This will only start the Mongo Container)
  * In the server directory run `yarn run start`
  * In the client directory run `yarn run start:dev`

### Testing

All the code (both server and client side) needs to be unit tested. To facilitate this, all unit tests are run
on every code check-in to the project on Github.

 #### Client Side
 
 If you wish to run client-side unit test manually run the following `yarn run test` in the `client` directory. To run the unit tests
 with coverage run `yarn run test:coverage` 
 
 #### Server Side
 
 If you wish to run server-side tests, navigate to the `Server` directory, and run `yarn run test`
