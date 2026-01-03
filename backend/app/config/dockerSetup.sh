#!/bin/bash

#set parameters
PASSWORD="posty"
USER="postgres"
DB="testdb"
NAME="tut_postgres"

#run docker to setup postgres
docker run --rm --name $NAME -e POSTGRES_PASSWORD=$PASSWORD -e POSTGRES_USER=$USER -e POSTGRES_DB=$DB -p 5432:5432 postgres