const http = require('http');

const app = require('./app');

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/planets.model');

// Looks to see if there is a port in env file, if not then run the default.
const PORT = process.env.PORT || 8000;

// Pass Express object into http create server.
const server = http.createServer(app);



// Will resolve, then move on to the next 
async function startServer() {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(PORT,() => {
        console.log(`Listening on port ${PORT}...`)
    });
}

// Will load on code execution, so the await command will precede the server startup call. 
startServer();


// If React or front-end app runs on a certain port, it's good to have backend server to run on different port for testing.


// JUST FOR DEMO-- Standard Express Install. express() is how to start the server.

// const express = require('express');

// const app = express();
// app.listen();