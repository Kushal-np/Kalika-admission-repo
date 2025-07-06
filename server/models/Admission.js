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
  schoolType: String
});

export default mongoose.model('Admission', admissionSchema);
