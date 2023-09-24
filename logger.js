const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');

require('winston-daily-rotate-file');

const logtailSourceToken = 'Lu7ukZAJMBobComEe8J918A7';

const logtail = new Logtail(logtailSourceToken);

const getLoggerProperties = (type = 'common') => ({
  defaultMeta: {
    component: type,
  },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      lazy: true,
      dirname: `./logs/${type}`,
      filename: `%DATE%-${type}-logs.txt`,
      datePattern: 'YYYY-MM-DD_HH-mm-ss',
      maxSize: '1m',
      utc: true
    }),
    new LogtailTransport(logtail),
  ],
})

const commonLogger = new createLogger(getLoggerProperties('common'));
const apiLogger = new createLogger(getLoggerProperties('api'));

module.exports = {
  commonLogger,
  apiLogger,
};