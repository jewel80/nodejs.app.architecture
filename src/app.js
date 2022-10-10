const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const { connectWithDb, dbUrl } = require("./config/mongoDB")
const { infoLogger } = require("./config/logger")
const configureRouters = require('./routers/index')

const configureRoutes = require("./routers/index");
const { handleRequest, handleError } = require("./middlewares");
const swaggerUI = require("swagger-ui-express");

dotenv.config();

const app = express();
app.use(express.json());
//success requrest handle uesd to app...
app.use(handleRequest);

//if, {"ENVIRONMENT = TEST"} igonre "infoLogger()" function called..
if (process.env.ENVIRONMENT != 'TEST')
    app.use(infoLogger());

//route function called and used app parameter(express)...
configureRoutes(app);

//error requrest handle uesd to app...
app.use(handleError);

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


module.exports = app;