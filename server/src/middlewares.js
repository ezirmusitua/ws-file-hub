const Compress = require('koa-compress');
const Cors = require('@koa/cors');
const Csrf = require('koa-csrf');
const Paginate = require('koa-ctx-paginate');
const Session = require('koa-session');
const SESSION_CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true,
  /** (boolean) automatically commit headers (default true) */
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

const CSRF_CONFIG = {
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  disableQuery: false
};

const COMPRESS_CONFIG = {
  threshold: 2048
};

const middlewares = [
  () => Compress(COMPRESS_CONFIG),
  () => Cors(),
  // () => new Csrf(CSRF_CONFIG),
  // () => (ctx, next) => {
  //   if (!['GET', 'POST'].includes(ctx.method)) return next();
  //   if (ctx.method === 'GET') {
  //     ctx.body = ctx.csrf;
  //     return;
  //   }
  //   ctx.body = 'OK';
  // },
  () => Paginate.middleware(10, 50),
  (app) => Session(SESSION_CONFIG, app)
];

function applyMiddlewares(app) {
  middlewares.forEach(m => app.use(m(app)));
}

function applyWebSocketMiddlewares(app) {
  middlewares.forEach(m => app.ws.use(m(app)));
}

module.exports = {
  applyMiddlewares,
  applyWebSocketMiddlewares
};
