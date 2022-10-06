const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { connectWithDb, dbUrl } = require("./config/mongoDB")
const {infoLogger, errorLogger} = require("./config/logger")

const configureRouters =require('./routers/index')



const app = express();
app.use(express.json())
// app.use(bodyParser);
app.use(cors());

app.use(infoLogger());
app.use(errorLogger(dbUrl));

console.log(configureRouters(app));

app.get('/', function(req, res){
    res.send(".......Hello world!");
 });





connectWithDb()

console.log(process.env.PORT);

app.listen(process.env.PORT || 4100, () => {
    console.log('app is running on port', process.env.PORT)
})


// export default app;
module.exports=app;