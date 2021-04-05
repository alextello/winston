const logger = require('./logger');
var Koa = require('koa');
var Router = require('koa-router');
const morgan = require('koa-morgan')

var app = new Koa();
var router = new Router();

const myStream = {
    write: (text) => {
        logger.info(text)
    }
}
app.use(morgan(':method :url :status :res[content-length] :wp - :response-time ms', {
    stream: myStream,
    // skip: function (req, res) { return res.statusCode < 400 }
}));

morgan.token('wp', function (req, res) { return req.headers['wp'] })

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        err.status = err.statusCode || err.status || 500;
        logger.error(err);
        throw err;
    }
});

app
    .use(router.routes())
    .use(router.allowedMethods());

router.get('/', (ctx, next) => {
    logger.info('entra a funcion')
    // ctx.throw(400, 'error 400')
    ctx.body = true;
});

app.listen(5000);