const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, errors, json } = format;

function prodLogger() {

    return createLogger({
        level: 'info',
        format: combine(
            // label({ label: 'data extra' }),
            errors({ stack: true }),
            timestamp(),
            json(),
        ),
        defaultMeta: { service: 'bpm' },
        transports: [
            new transports.Console()
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'exceptions.log' })
        ]
    });
}

module.exports = prodLogger;