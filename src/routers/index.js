const routes = require('./routes');

const configure = (app) => {
    
    app.use('/api/v1', routes);

    // console.log( routes);
}

// export default configure;
module.exports=configure;