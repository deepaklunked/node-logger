const morgan = require('morgan');
const { apiLogger } = require('./logger');

const messageFormat = ':remote-user - :remote-addr - :method :url :status - :user-agent - :response-time ms';

const apiInterceptor = morgan(messageFormat, {
  stream: { write: (message) => apiLogger.info(message.trim()) },
});


module.exports = apiInterceptor;