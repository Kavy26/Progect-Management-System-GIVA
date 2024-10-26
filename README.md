# GIVA - Internship Assignment: Full-Stack Development
## Objective
To assess your ability to work with modern web technologies, particularly focusing on Postgres, React, and Node.js. You will be tasked with developing a basic e-commerce feature that demonstrates your skills in frontend and backend development.
## Postgres Database Setup
* Create a USER
```sql
CREATE USER giva WITH PASSWORD 'iitk';
```
* Give Permissions to USER to Create Databases
```sql
ALTER USER giva CREATEDB;
```
* Create Database
```sql
CREATE DATABASE giva;
```
* Give All Privileges of Database to USER
```sql
GRANT ALL PRIVILEGES ON DATABASE giva TO giva;
```
* Switch to USER
```sql
\c giva;
```
* Create TABLE
```sql
CREATE TABLE products(id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price FLOAT NOT NULL, quantity INT NOT NULL);
```
* Give all necessary Permissions of Table to USER
```sql
GRANT ALL PRIVILEGES ON TABLE products TO giva;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO giva;
```
## Backend
### Setup
```bash
cd backend
node init -y
npm install express cors pg dotenv
```
### Run
```bash
node app.js
```
### Endpoints
* /products
    * METHOD: GET
    * RETURNS: List of all Products
* /getProductDetails
    * METHOD: GET
    * PARAMETERS
        * id: Product ID
    * RETURNS: Product's Details
* /add
    * METHOD: POST
    * PARAMETERS
        * name: Name of the Product
        * description: Description of the Product
        * price: Price of the Product
        * quantity: Quantity of the Product
    * PURPOSE: Adds Product to Database
* /edit
    * METHOD: PUT
    * PARAMETERS
        * id: Product ID
        * name: Name of the Product
        * description: Description of the Product
        * price: Price of the Product
        * quantity: Quantity of the Product
    * PURPOSE: Edits Product on Database
* /delete
    * METHOD: DELETE
    * PARAMETERS
        * id: Product ID
    * PURPOSE: Deletes Product from Database