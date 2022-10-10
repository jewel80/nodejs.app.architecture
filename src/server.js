
const app =require("./app");
const { connectWithDb, dbUrl } = require("./config/mongoDB")
const {errorLogger} = require("./config/logger")

app.listen(process.env.PORT || 4100, () => {
    //DB server connected...
    connectWithDb();

    if (process.env.ENVIRONMENT != 'TEST')
        app.use(errorLogger(dbUrl));
        
    console.log('app is running on port', process.env.PORT || 4100);
});

// process.on('warning', e => console.warn(e.stack));
// process.setMaxListeners(0);