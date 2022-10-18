const express = require('express');
const { getAllPlanets } = require('./planets.controller')

const planetsRouters = express.Router();

planetsRouters.get('/planets', getAllPlanets);

module.exports = planetsRouters;