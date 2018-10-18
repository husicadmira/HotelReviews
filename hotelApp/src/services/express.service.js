import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export default (router) => {
    const app = express();
    app.use(cors({ origin: true, credentials: true }));
    app.use(bodyParser.json());
    app.use('/', router);
    return app;
} 