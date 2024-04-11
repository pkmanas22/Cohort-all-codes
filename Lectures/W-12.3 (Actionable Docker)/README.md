# 1. Open docker

# 2. Most common used command

## 1. Running a simple image

- Let’s say you wan’t to run MongoDB locally https://hub.docker.com/_/mongo

```
docker run mongo
```

## 2. Adding a port mapping

```
docker run  -p 27017:27017 mongo
```

## 3. Starting in detached mode

- Adding -d will ensure it starts in the background

```
docker run -d -p 27017:27017 mongo
```

## 4. Inspecting a container

```
docker ps
```

## 5. Stopping a container

```
docker kill <container_id>
```

# 3. Postgres setup using docker

https://hub.docker.com/_/postgres

```
docker run --name <container_name> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=<database_name> -d -p <host_port>:5432 postgres
```

```
docker run --name todo-assignment-postgres -e POSTGRES_USER=manas -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=todo-assignment -d -p 5432:5432 postgres
```

- here
  - `--name` for the container name. If not given, it will generate random string
  - `-e` stands for env
  - `POSTGRES_USER` is optional. If not given user name is by default `postgres`
  - `POSTGRES_PASSWORD` is mandatory
  - `POSTGRES_DB` is also optional. If not given it takes from `POSTGRES_USER`
  - `-d` stands for detached mode
  - `-p` stands for port mapping
  - `5432:5432`: first one is in local machine & second one is inside docker machine
  - `postgres` is image name; which is stored in docker hub

# 4. The connection string for postgres is

```
postgresql://<username>:<password>@<host>:<port>/<database_name>
```

- In this case

```
postgresql://manas:mysecretpassword@localhost:5432/todo-assignment
```

# 5. Then connect your terminal for running `psql` for postgres

```
docker exec -it [container-id] /bin/bash
```

    - THe above command is not running in git bash in windows
    - This will connect to shell of docker
    - After that
    ```
    psql -U <dataBaseUserName> <dataBaseName>
    ```
    - in our case
    ```
    psql -U manas todo-assignment
    ```

(or)

- In single line

```
docker exec -it  <container-name> psql -U <dataBaseUserName> <dataBaseName>
```

- In our case

```
docker exec -it todo-assignment-postgres psql -U manas todo-assignment
```

# 6. Access database by running

```
\dt;
```

# 7. Quiting from databse

```
\q;
```
