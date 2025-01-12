import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
configDotenv();

import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { mainRouter } from './routes/mainRoute.js';
import { connectDB } from './config/dbConnect.js';

connectDB();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', mainRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
