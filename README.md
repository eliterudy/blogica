# Blogica - Crowdsourcing Blog Website v1.0

This is a crowdsourcing blog website that has been developed using the MERN stack - MongoDB, Express, React, and Node.js. Users are enabled to create and publish their own blog posts, read and engage with content shared by other users, and follow or subscribe to preferred authors. Additionally, the app features a badge system that endows authors with a sense of accomplishment, and an incentive system that rewards them based on the level of engagement their articles receive, including views and likes.

## Installation Steps

To run this project on your local machine, follow these steps:

Clone the repository:
```bash
git clone https://github.com/eliterudy/blogica.git
```
Install dependencies for the backend and frontend:
```bash
cd blogica/Implementation/blogica-backend
npm i
cd blogica/Implementation/blogica-frontend
npm install
```

### Creating ENV files
Create a .env files in the root directory both the frontend and the backend source code and add the following variables:

For Backend env files:
```
NODE_ENV=development
PORT=5000
IS_PRODUCTION = <add according to your env file: true | false>
DB_CONNECT = <your-mongodb-uri>
JWT_SECRET = <your-jwt-secret>
IMAGEKIT_ID = <your-imagekit-id>
IMAGEKIT_PUBLIC_KEY = <your-imagekit-public-key>
IMAGEKIT_PRIVATE_KEY = <your-imagekit-private-key>
```

For Frontend env files:
```
REACT_APP_API_URL = <your-server-url>
REACT_APP_APP_URL = <your-app-url>
```

### Start the development server

For backend:
```
npm start
```

For frontend:
```
npm start
```

This will start the backend server on port 5000 and the frontend server on port 3000 (by default).

Execution Steps

Once the development server is running, you can access the website in your browser by navigating to http://localhost:3000.

You can create a new account by clicking on the "Sign Up" button on the navbar and providing your name, email, and password. Once you've created an account, you can log in and start creating blog posts by clicking on the "New Post" button. You can also read and interact with other users' posts by clicking on them from the homepage.

Happy blogging!





