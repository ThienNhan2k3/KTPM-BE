'use strict'

const path = require("path");
const winston = require("winston");
require('winston-daily-rotate-file');
const {combine, json, timestamp, printf, align} = winston.format;

const formatPrint = printf(({level, message, label, timestamp}) => {
    return `[${timestamp}] ${level}: ${message}`
})

// const logger = winston.createLogger({
//     level: process.env.LOG_LEVEL || "debug",
//     format: combine(
//         timestamp({
//             format: 'YYYY-MM-DD hh:mm:ss.SSS A'
//         }),
//         align(),
//         myFormat
//     ),
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({
//             dirname: 'logs',
//             filename: "test.log"
//         })
//     ]
// })

// const formatPrint = printf(({level, message, context, requestId, timestamp, metadata}) =>{
//     return `[${timestamp}] ${level}::${context}::${requestId}::${message}::${JSON.stringify(metadata)}`
// })

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "debug",
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        formatPrint
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'warn',
            filename: './logs/logsWarnings.log'
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/logsErrors.log'
        }),
        new winston.transports.File({
            level: 'info',
            filename: './logs/logsInfos.log'
        })
        
    ]
})

module.exports = logger;