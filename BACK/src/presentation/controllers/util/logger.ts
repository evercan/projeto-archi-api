const { createLogger, format, transports } = require('winston');

export const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({format: 'D/M/YY HH:mm:ss'})
    ),
    transports: [new transports.Console()],
  });