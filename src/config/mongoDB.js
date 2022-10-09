const mongoose = require('mongoose');

const HOST = process.env.MONGODB_HOST || "localhost";
const dbName = process.env.DB_NAME || "product-db";

//mongoDB path...
const dbUrl = `mongodb://${HOST}:27017/${dbName}`;
exports.dbUrl =dbUrl;

//if, have any option...
const options = {};

//MongoDB connection....
const connectWithDb = () => {
    mongoose.connect(dbUrl, options, (err, db) => {
        if (err) {
            console.error(err);
        }
        else console.log("database connection established and db-name:", dbName);
    });
};
exports.connectWithDb = connectWithDb;