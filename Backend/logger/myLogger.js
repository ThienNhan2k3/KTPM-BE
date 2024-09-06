'use strict'

const winston = require("winston");
require('winston-daily-rotate-file');
const {combine, json, timestamp, printf, align} = winston.format;

class MyLogger extends winston.Logger {
    constructor() {
        super();
        const formatPrint = printf(({level, message, label, timestamp}) => {
            return `[${timestamp}] ${level}: ${message}`
        })
        this.infoLogger = winston.createLogger({
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
                new winston.transports.DailyRotateFile({
                    dirname: './logs',
                    filename: 'application-%DATE%.info.log',
                    datePattern: 'YYYY-MM-DD-HH-mm',
                    zippedArchive: false,
                    maxSize: '50m',
                    maxFiles: '3d',
                    format: combine(
                        timestamp({
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
                        }),
                        align(),
                        formatPrint
                    ),
                }),
                
            ]
        })
        this.errorLogger = winston.createLogger({
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
                new winston.transports.DailyRotateFile({
                    dirname: './logs',
                    filename: 'application-%DATE%.error.log',
                    datePattern: 'YYYY-MM-DD-HH-mm',
                    zippedArchive: false,
                    maxSize: '50m',
                    maxFiles: '3d',
                    format: combine(
                        timestamp({
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
                        }),
                        align(),
                        formatPrint
                    ),
                    level: "error"
                }),
                
            ]
        })
    }

    log(message, params) {
        const logObject = Object.assign({
            message
        }, params)
        this.errorLogger.info(logObject);
    }

    error(message, params) {
        const logObject = Object.assign({
            message
        }, params)
        this.errorLogger.error(logObject);
    }
}

module.exports = new MyLogger();