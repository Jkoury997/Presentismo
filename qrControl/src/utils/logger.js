const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Nivel mínimo de log
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss' // Formato de la fecha
    }),
    format.errors({ stack: true }), // Incluir stack trace para errores
    format.splat(),
    format.json() // Formato JSON para los logs
  ),
  defaultMeta: { service: 'user-service' }, // Meta información por defecto
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }), // Archivo para errores
    new transports.File({ filename: 'combined.log' }) // Archivo para todos los logs
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple() // Formato simple para la consola
    )
  }));
}

module.exports = logger;
