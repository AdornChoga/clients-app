import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import clients from './routes/clients.route.js';
import providers from './routes/providers.route.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clients App API',
      version: '1.0.0',
      description: 'This is an API for clients app',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./api-documentation/*.js'],
};

const specs = swaggerJSDoc(options);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.use(express.json());

app.use('/clients', clients);
app.use('/providers', providers);

const mongoDB = process.env.DB_URI;

mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Database connection established'),
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
