# Groupomania

### How to use:

1. Clone git project.

##### Backend:
2. Install dependencies for backend (**"npm i"** from **backend/**).

3. Create **.env** in **backend/config/** with var ('PORT', 'NODE_ENV', 'JWT_KEY', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE', 'DB_HOST', 'DB_DIALECT').

4. When done, start your **mysql server**.

5. Go inside backend folder then use commande **'npm run dbconfig'** which should create database with seeders.

6. Then use command **'npm start'** which will start the backend server.

##### Frontend:

7. Create **.env** in **frontend/** with var ('REACT_APP_AUTH_API', 'REACT_APP_USERS_API', 'REACT_APP_POSTS_API', 'REACT_APP_COMMENTS_API') which contains url for API.

8. Go inside **frontend/** then use command **'npm i'**.

9. Once all the dependencies are downloaded, start with **'npm start'**.

## Used:

##### Frontend:

- React
- Axios
- Node-Sass
- Local Storage

##### Backend :

- Node.js
- Express
- Sequelize
- Mysql