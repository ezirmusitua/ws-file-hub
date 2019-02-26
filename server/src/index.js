const {applyMiddlewares} = require('./middlewares');
const {connectDatabase} = require('./database');
const {createApp} = require('./app');

const Router = require('koa-router');

async function startServer() {
  const app = createApp();
  const router = new Router();
  const wsRouter = new Router();
  wsRouter.all('/debug/:id', (ctx) => {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Welcome to WS File Hub');
    ctx.websocket.on('message', function (message) {
      // do something with the message from client
      ctx.websocket.send(`You say: ${message}`);
    });
  });
  router.get('/debug/:id/', async (ctx, next) => {
    console.log('ctx request url: ', ctx.request.url);
    console.log('ctx request body: ', await ctx.request.body());
    console.log('ctx request params: ', ctx.params);
    console.log('ctx request query: ', ctx.request.query);
    ctx.body = 'Hello World';
    next();
  });
  try {
    applyMiddlewares(app);
    await connectDatabase();
    // Using routes
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.ws.use(wsRouter.routes());
    app.ws.use(wsRouter.allowedMethods());
    app.run({});
  } catch (err) {

  }
}

startServer();
