import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import clients from './routes/clients.route.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/clients', clients);

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
