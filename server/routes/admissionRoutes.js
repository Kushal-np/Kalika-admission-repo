import express from 'express';
import multer from 'multer';
import { submitForm } from '../controllers/admissionController.js';

const router = express.Router();

// 🧠 Use memory storage if storing files in MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📝 Expect these files (as per the frontend form)
const fileFields = [
  { name: 'ppPhoto', maxCount: 1 },
  { name: 'citizenship', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'guardianSignature', maxCount: 1 }
];

// 🛠️ Updated route with multer middleware
router.post('/submit', upload.fields(fileFields), submitForm);

export default router;
