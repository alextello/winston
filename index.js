const logger = require('./logger');

const mockhd = {
    wp: 'a1servicios',
    apikey: '123456'
};

logger.info('Test info', mockhd);
logger.warn('Test warn');
logger.error('Test error');
logger.debug('Test debug');
logger.error(new Error('algo ha ocurrido'), mockhd);

// throw new Error('Algo ha ocurrido')