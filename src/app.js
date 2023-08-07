const express = require('express');
const setRoutes = require('./setters/routeSetters');
require('dotenv').config();
const APIResponseFormat = require('./utils/APIResponseFormat');
const connect = require('./db/conn');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setRoutes(app);

app.get("/", (req, res) => {
    return APIResponseFormat._ResDataFound(res, "Welcome to the Bioler Plate Of NodeJS API");
});


app.use('*', (req, res) => {
    return APIResponseFormat._ResRouteNotFound(res);
});





app.listen(process.env.PORT, () => {
    console.log(`Server Started on http://localhost:${process.env.PORT}`);
});