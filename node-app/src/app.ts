import express from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import uploaderRoutes from './routes/uploader.routes';
import startup from './middlewares/startup';

// initialize app
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../logs.log'), { flags: 'a' }) }));

// apply uploader routes
app.use(uploaderRoutes);

app.use(startup); // apply startup configurations

// testing
app.get('/test', (req, res, next) => {
  res.json({ message: 'test' });
});

app.listen(port, () => {
  console.log('Server is Started: http://localhost:' + port);
});

export { app };
