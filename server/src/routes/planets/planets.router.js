// Making a specific router file for just planets.

const express = require('express');
const { httpGetAllPlanets } = require('./planets.controller');
const planetsRouter = express.Router();


planetsRouter.get('/',httpGetAllPlanets);

// Export planet-related routes to middleware in app.js
module.exports = planetsRouter;