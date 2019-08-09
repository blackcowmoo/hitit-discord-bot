import express from 'express';
import bodyParser from 'body-parser';

export const app = (() => {
  const app = express();
  app.use(bodyParser.json());
  return app;
})();
