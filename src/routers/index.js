const routes = require('./routes');

const configure = (app) => {
    
    app.use('/api/v1', routes);
    
}

module.exports=configure;