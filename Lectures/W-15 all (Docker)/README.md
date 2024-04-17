<div style="text-align: center;">

# Video-1 (Docker Intro)

</div>

- Here, we have containerise the week-15-live-1 folder.

# 1. Create a `Dockerfile` file

- create a file named `Dockerfile` inside the targeted folder
- Inside the file
  For example:-

  ```
  # Use the Node.js 20 image as the base
  FROM node:20

  # Set the working directory inside the container
  WORKDIR /app

  # Copy the local files into the container at /app
  COPY . .

  # Install dependencies
  RUN npm install

  # Build the project
  RUN npm run build

  # Generate Prisma client code
  RUN npx prisma generate

  # Expose port 3000 to the outside world
  EXPOSE 3000

  # Command to run the application
  CMD [ "node", "dist/index.js" ]

  ```

### Common commands

- `WORKDIR`: Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` instructions that follow it.
- `RUN`: Executes any commands in a new layer on top of the current image and commits the results.
- `CMD`: Provides defaults for executing a container. There can only be one CMD instruction in a Dockerfile.
- `EXPOSE`: Informs Docker that the container listens on the specified network ports at runtime.
- `ENV`: Sets the environment variable.
- `COPY`: Allow files from the Docker host to be added to the Docker image

# 2. Create a `.dockerignore` file

- add the unwanted file into it

```
 node_modules
 dist
 .git
 .gitignore
 .env.example
```

# 3. Building Images

- Now that we have a dockerfile in our project, try building a docker image from it.
- ```
  docker build -t [image_name] .
  ```
- Now if we try to look at our images, we should notice a new image created
- ```
  docker images
  ```

# 4. Running images

```
docker run -p 3000:3000 [image_name]
```

- Try visiting `localhost:3000`

# 5. Passing in env variables

```
docker run -p 3000:3000 -e DATABASE_URL="[db_url]" [image_name]
```

- The `-e` argument let’s you send in environment variables to your node.js app

# 6. More commands

## 1. `docker ps` - All docker process status

```
docker ps
```

## 2. `docker kill` - to kill a container

```
docker kill [container_id]
```

## 3. `docker exec` - to exectue a command inside a container

### a. List all contents of a container folder

```
docker exec <container_name_or_id> ls
```

### b. Running an Interactive Shell

```
docker exec -it <container_name_or_id> //bin/bash
```

<div style="text-align: center;">

# Video-2 (Docker Part - 2)

</div>

# 1. Layers

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa7018106-27d9-4833-9206-d20d05ab8a11%2FScreenshot_2024-03-10_at_1.29.42_PM.png?table=block&id=5adef147-fe82-4e9a-9e82-dbb3738b3104&cache=v2)

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F891e06cd-8ce7-402e-9e0d-15d7e9852e3d%2FScreenshot_2024-03-10_at_1.31.53_PM.png?table=block&id=d06687c2-32b3-4419-865c-367f7a0ffdd8&cache=v2)

- Base image creates the first layer
- Each RUN, COPY , WORKDIR command creates a new layer.
- Layers can get re-used across docker builds (notice CACHED in 1/6)
- If you change our Dockerfile, layers can get re-used based on where the change was made
- <i> If a layer changes, all subsequent layers also change </i>

- To solve the above problem, we optimised our dockerfile

# 2. Optimising Dockerfile

- We first copy over only the things that `npm install` and `npx prisma generate` need
- Then we run these scripts.
- Then we copy over the rest of the source code

```
# Use the Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package*(package.json and package-lock.json) and ./prisma to the container
COPY package* .
COPY ./prisma .

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for incoming connections
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
```

### Case 1 - You change your source code (but nothing in package.json/prisma)

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F60fd50e5-576a-4039-a0e0-6617293d10ce%2FScreenshot_2024-03-10_at_2.29.47_PM.png?table=block&id=e69f3527-8cd6-42a7-9d94-b17ac42467f0&cache=v2)

### Case 2 - You change the package.json file (added a dependency)

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fda3357b0-33e6-47ab-b552-4e52ecbfa808%2FScreenshot_2024-03-10_at_2.30.51_PM.png?table=block&id=c8cc1aaf-8c6a-48d4-b764-f1531207260b&cache=v2)

![Network & Volumes](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fbc784ebf-de6a-47ac-bb73-5fd44ba82e46%2FScreenshot_2024-03-10_at_3.28.40_PM.png?table=block&id=f4d28211-1790-4f26-85da-9e55cf259f89&cache=v2)

# 3. Volumes

- When we restart `mongo` docker container, the mongo data will goes away.
- To solve this, we can use volumes.
- This is because docker containers are `transitory` (they don’t retain data across restarts)
- Using volumes, we can persist the data across restarts.

## 1. Create a `volume`

```
docker volume create [volume_database_name]
```

## 2. Mount the folder in `mongo` which actually stores the data to this volume

```
docker run -v [volume_database_name]:/data/db -p 27017:27017 mongo
```

```
docker run -v [volume_name]:[path_in_container] [port-mapping] [image_name]
```

# 4. Network

- Network is allowed containers to communicate with each other and with the outside world.
- Docker containers can't talk to each other by defalult.
- `localhost` on a docker container means `it's own network` and not the network of the `host machine`.

## How to make containers talk to each other?

### 1. Clone the repo

### 2. Build the image

```
docker build -t [image_name] .
```

### 3. Create the network

```
docker network create [my_custom_network]
```

- There are two types of networks :- `Bridge` and `Host`
- `Bridge` is default network driver for containers.
- `Host` is useful for services that need to handle lots of traffic or need to expose many ports

```
docker network create --driver=bridge my_custom_network
docker network create --driver=host my_custom_network
```

### 4. Start the `backend process` with the `network` attached to it

```
docker run -d -p 3000:3000 --name backend --network my_custom_network image_tag
```

### 5. Start mongo on the same network

```
docker run -d -v volume_database:/data/db --name mongo --network my_custom_network -p 27017:27017 mongo
```

### 6. Check the logs to ensure the db connection is successful

```
docker logs <container_id>
```

#### We have to ensure that the mongo db url inside source code should be `mongodb://[network_name]:27017/[database_name]`

<div style="text-align: center;">

# Video-3 (Docker Part - 3)

</div>

# 1. More Commands

### 1. list all images

```
docker images
```

### 2. kill image

```
docker rmi [image_name]
```

### 3. Exit from container

```
exit
```

### 4. Remove container

```
docker rm [container_id]
```

# 2. Push into `docker hub`

### 1. Login to `https://hub.docker.com/`

### 2. Create the new repository

### 3. Login to docker cli

```
docker login
```

### 4. Build the projet image

```
docker build -t [dockerhub_username/image_name:tag_name] .
```

- By defalut the `tag_name` is `latest` if not given.

### 5. Push the image

```
docker push [dockerhub_username/repository_name:tag_name]
```

# 3. docker-compose

- To run multiple containers at the same time, we can use `docker-compose`
- With compose, we use a `yaml` file to configure application's services, networks, volumes.
- Then with single command, we can create and start all the services from confguration file.

![alt text](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F161f82ec-cbf1-4654-ab9b-a052fd1da6be%2FScreenshot_2024-03-10_at_5.36.58_PM.png?table=block&id=8e4f86ba-c720-4f78-8c97-1926391deb73&cache=v2)

- Before `docker-componse` we have to create network, volumes and images first, then start separative containers to run application.

### 1. Install `docker-compose`

https://docs.docker.com/compose/install/

### 2. Create a `yaml` file describing all containers and volumes

- We can use `docker-compose.yml` or `docker-compose.yaml`
- by default all containers in a `docker-compose `run on the same network

```
version: '3.8' # version of the docker-compose

services:
  # mongo sevices
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  # backend services
  backend:
    # image: backend      --> we can use image or build
    build: .      # it build the image
    container_name: backend_app
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL="mongodb://mongodb:27017"

# volumes to create
volumes:
  mongodb_data:

```

- `yml` is same as `json`- having key-value pair

```
{
  "version": "3.8",
  "services": {
    "mongodb": {
      "image": "mongo",
      "container_name": "mongodb",
      "ports": [
        "27017:27017"
      ],
      "volumes": [
        "mongodb_data:/data/db"
      ]
    },
    "backend": {
      "build": ".",
      "container_name": "backend_app",
      "depends_on": [
        "mongodb"
      ],
      "ports": [
        "3000:3000"
      ],
      "environment": [
        "MONGO_URL=\"mongodb://mongodb:27017\""
      ]
    }
  },
  "volumes": {
    "mongodb_data": null
  }
}
```

### 3. Start `docker-compose`

```
docker-compose up
```

### 4. check the volume

```
docker volume ls
```

### 5. check the network

```
docker network ls
```

### 4. Stop everything (including volumes)

```
docker-compose down --volumes
```

<div style="text-align: center;">

# Video-4 (Docker Part - 4)

</div>

# 1. Bind mounting

- We do bind mounting for hot reloading during local development.
- Just like nodemon, react, next, etc.

```
docker run -p [host_port]:[docker_port] -v [volume_name]:[path_in_container] [image_name]
```

```
docker run -p 3000:3000 -v ./app:/usr/src/nextapp/app nextapp
```
