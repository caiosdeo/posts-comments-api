require('dotenv').config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import router from './router';
import './db';

const app = express();

app.use(bodyParser.json());
app.use('/', router());

const server = http.createServer(app);
const { SERVER_PORT } = process.env;
server.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}/`);
})

