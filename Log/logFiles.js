const winston = require('winston')
const path = require('path')

// let logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.printf(info => {
//             return `${info.timestamp} ${info.level}: ${info.message}`;
//         })
//     ),
//     transports: [new winston.transports.Console()]
// });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service : 'user-service'},
    transports: [
        new winston.transports.File({filename:path.join(__dirname,'../logger/error.log'),level: 'error'}),
       new winston.transports.File({filename:path.join(__dirname, '../logger/combined.log')})
    ]
})

// logger.add(new winston.transports.Console({format: winston.format.simple()}))
logger.add(new winston.transports.Console({format: winston.format.json()}))

module.exports = logger



