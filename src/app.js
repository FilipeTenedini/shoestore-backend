import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongodb from './config/database.js';
import router from './routes/index.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

connectMongodb();

app.use(router);

app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));