const mongoose = require('mongoose');

const HOST = process.env.MONGODB_HOST || "localhost";
const dbName = process.env.DB_NAME || "product-db";

//mongoDB path...
const dbUrl = `mongodb://${HOST}:27017/${dbName}`;
exports.dbUrl =dbUrl;

const options = {};

const connectWithDb = () => {
    mongoose.connect(dbUrl, options, {
        // user: process.env.DB_USER,
        // pass: process.env.DB_PASSWORD,
        // dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host} and DB: ${dbName}`);
    })
}

exports.connectWithDb = connectWithDb;