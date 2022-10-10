const winston =require("winston");
const expressWinston =require("express-winston");
const winstonMongo =require("winston-mongodb");
const ElasticsearchTransport = require("winston-elasticsearch");
const winstonFile =require("winston-daily-rotate-file");

 
/**
 * @param {*} req 
 * @param {*} res 
 * @returns {object} get Message return..  
 */
const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body,
        path: req.headers.host + req.originalUrl,
    };
    return JSON.stringify(obj);
}

/**
 * 
 * @param {string} dbUrl 
 * @returns {object}
 */
const mongoErrorTransport = (dbUrl) => new winston.transports.MongoDB({
    db: dbUrl,
    metaKey: 'meta'
});

const HOST = process.env.ELASTICSEARCH_HOST || "localhost";

const elasticsearchOptions = {
    level: 'info',
    clientOpts: { node: `http://${HOST}:9200` },
    indexPrefix: 'log-parcelkoi'
};

const esTransport = new ElasticsearchTransport.ElasticsearchTransport(elasticsearchOptions);

/**
 * Info logger function...
 * @returns object
 */
const infoLogger = () => expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        //File create as this is "yyyy-MM-DD-HH" format...
        new winston.transports.DailyRotateFile(
            {
                filename: 'Logged/info/log-info-%DATE%.log',
                datePattern: 'yyyy-MM-DD-HH'
            }
        ),
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: getMessage
});
exports.infoLogger = infoLogger;

/**
 * Error logger function...
 * @param {string} dbUrl 
 * @returns object
 */
const errorLogger = (dbUrl) => expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile(
            {
                filename: 'Logged/error/log-error-%DATE%.log',
                datePattern: 'yyyy-MM-DD-HH'
            }
        ),
        mongoErrorTransport(dbUrl),
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }'
});
exports.errorLogger = errorLogger;




















