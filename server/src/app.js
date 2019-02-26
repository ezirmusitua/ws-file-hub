const Koa = require('koa');
const BodyParser = require('koa-body-parsers');
const QueryString = require('koa-qs');
const greenlock = require('greenlock-express');
const websockify = require('koa-websocket');

const wsOptions = {};

function createApp() {
  const le = greenlock.create({
    // ...
  });
  let app;
  if (process.env.NODE_ENV === 'production') {
    app = websockify(new Koa(), wsOptions, le);
  } else {
    app = websockify(new Koa(), wsOptions);
  }
  app = QueryString(app);
  app = BodyParser(app);
  app.run = ({host = '0.0.0.0', port = 3000}) => {
    console.info(`listen ${host}:${port}`);
    app.listen(port, host);
  };
  return app;
}

module.exports = {
  createApp
};
