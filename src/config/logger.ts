import winston from 'winston';

export const createLogger = (logToConsole: boolean) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'evankasky.dev' },
    transports: [
      /*
      Write all logs with importance level of 'error' or higher to 'error.log'
      ( i.e. error and fatal logs )
      */
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

      /* 
      Write all logs with importance level of 'info' or higher to 'combined.log'
      (i.e. info, warning, error, fatal )
      */
      new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),

      /* 
        If NODE_ENV is not production then log to the console
      */
      ...(logToConsole === true
        ? [
            new winston.transports.Console({
              format: winston.format.simple()
            })
          ]
        : [])
    ]
  });
};
