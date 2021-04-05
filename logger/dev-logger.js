const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, errors, json } = format;

function devLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp}  ${level}: ${stack || message}`;
    });
    return createLogger({
        level: 'debug',
        format: combine(
            label({ label: 'data extra' }),
            errors({ stack: true }),
            timestamp(),
            logFormat,
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

module.exports = devLogger;