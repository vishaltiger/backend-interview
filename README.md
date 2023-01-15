# Project Description
This project includes 1. Node.js as scripting language which using 2.Express framework for doing http call .
3. Knex for connecting to data base Postgres.
It work as user can add any orders and using knex it connects to database and saves the record .
user can fetch data from the database as well based on the required properties.

# For Production
1. Change the port number to be dynamic as Proess.env.port
2. change the database host to Process.env.databaseUrl whatever the production url where it will be going to deployed like heroku
 example {
  connectionString:Process.env.DatabaseUrl in the connection with knex and pg
 }

# specs
1. user can post new order using 'http://localhost:3000/addOrder'
sample body to be passed
 {
"totalFee":500,
"services":[123,124]
}
2. user get get all orders using '/allorders'
3. user can post  order based on service to get the specifuc orders using '/getorderbyservice'
sample body to be passed
 {
"name":"Inspection"
}
4. user can add new service using 'addservice/'

sample body 
{
  serviceid:123
        name:"Inspection"
}

# Env setup
1. Pull the repo
2. type npm i
3. create tables in postgress 
# Orders table
  > create table orders(
id serial unique,
datetime Date,
fee int,
service int	
)
# Services table
> create table services(
id serial unique,
	serviceid int,
	name varchar
)

database name = postgres
user = postgres
password = postgress
host = 127.0.0.1
data base used = pg
