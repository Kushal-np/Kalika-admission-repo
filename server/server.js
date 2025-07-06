import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import admissionRoutes from './routes/admissionRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/api/admission', admissionRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
