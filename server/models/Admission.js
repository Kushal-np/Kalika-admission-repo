import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  motherName: String,
  guardianName: String,
  dateOfBirth: String,
  sex: String,
  nationality: String,
  tempAddress: String,
  permAddress: String,
  tempMobile: String,
  permMobile: String,
  email: String,
  emailPassword: String,
  schoolName: String,
  schoolAddress: String,
  province: String,
  gpa: String,
  symbolNo: String,
  schoolType: String,

  // 🆕 Guardian Declaration & Additional Fields
  guardianEmail: String,
  guardianMobile: String,
  date: String,

  // 🆕 File uploads (store as Buffer or use file path if using multer with disk storage)
  ppPhoto: Buffer,
  citizenship: Buffer,
  signature: Buffer,
  guardianSignature: Buffer,

  // 🆕 Checklist fields
  checklist: {
    admitCard: Boolean,
    gradesheet: Boolean,
    birthCertificate: Boolean,
    photos: Boolean,
    citizenshipPhoto: Boolean,
    otherDocs: Boolean
  }
});

export default mongoose.model('Admission', admissionSchema);
