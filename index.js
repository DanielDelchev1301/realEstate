import express from 'express';
import cors from 'cors';

import { connect } from './config/initializeDatabase.js';
import routes from './routes.js';
import spiderDetector from 'spider-detector';

const app = express();
const port = process.env.PORT || 5000;

app.use(spiderDetector.middleware());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

connect()
    .then(() => app.listen(port, () => console.log('Server is running...on port 5000')))
    .catch(err => console.log(`Something went wrong: ${err}`));
