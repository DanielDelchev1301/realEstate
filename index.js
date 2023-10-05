import express from 'express';
import cors from 'cors';

import { connect } from './config/initializeDatabase.js';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

connect()
    .then(() => app.listen(5000, () => console.log('Server is running...on port 5000')))
    .catch(err => console.log(`Something went wrong: ${err}`));
