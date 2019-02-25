const Koa = require('koa');
const route = require('koa-route');
const greenlock = require('greenlock-express');
const websockify = require('koa-websocket');

const wsOptions = {};
// const le = greenlock.create({
// all your sweet Let's Encrypt options here
// });
// const app = websockify(new Koa(), wsOptions, le);
const app = websockify(new Koa(), wsOptions);
// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use(function (ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
});

// Using routes
app.ws.use(route.all('/test/:id', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send('Hello World');
  ctx.websocket.on('message', function (message) {
    // do something with the message from client
    console.log(message);
    ctx.websocket.send(message);
  });
}));

app.listen(3000);
