import createProxy from './server/basic-proxy.js';
import middleware from './server/express-middleware.js';
import { rewriteHTML } from './server/html-rewriter.js';
import { resolveURL } from './server/url-utils.js';

export {
  createProxy,
  middleware,
  rewriteHTML,
  resolveURL
};
