const express = require ('express');
const routes = express.Router();

const ClientController = require('./controllers/ClientController');
const CarController = require('./controllers/CarController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/clients', ClientController.list);
routes.post('/clients', ClientController.create);

routes.get('/cars', CarController.list);
routes.post('/cars', CarController.create);
routes.delete('/cars/:id', CarController.delete);


module.exports = routes;
