import Admission from '../models/Admission.js';

export const submitForm = async (req, res) => {
  try {
    const {
      name, fatherName, motherName, guardianName,
      dateOfBirth, sex, nationality, tempAddress, permAddress,
      tempMobile, permMobile, email, emailPassword,
      schoolName, schoolAddress, province, gpa, symbolNo, schoolType,
      guardianEmail, guardianMobile, date
    } = req.body;

    // Checklist values (sent as strings: "true"/"false")
    const checklist = {
      admitCard: req.body['checklist[admitCard]'] === 'true',
      gradesheet: req.body['checklist[gradesheet]'] === 'true',
      birthCertificate: req.body['checklist[birthCertificate]'] === 'true',
      photos: req.body['checklist[photos]'] === 'true',
      citizenshipPhoto: req.body['checklist[citizenshipPhoto]'] === 'true',
      otherDocs: req.body['checklist[otherDocs]'] === 'true'
    };

    // Files from multer (memoryStorage)
    const ppPhoto = req.files?.ppPhoto?.[0]?.buffer || null;
    const citizenship = req.files?.citizenship?.[0]?.buffer || null;
    const signature = req.files?.signature?.[0]?.buffer || null;
    const guardianSignature = req.files?.guardianSignature?.[0]?.buffer || null;

    const admission = new Admission({
      name, fatherName, motherName, guardianName,
      dateOfBirth, sex, nationality, tempAddress, permAddress,
      tempMobile, permMobile, email, emailPassword,
      schoolName, schoolAddress, province, gpa, symbolNo, schoolType,
      guardianEmail, guardianMobile, date,
      checklist,
      ppPhoto,
      citizenship,
      signature,
      guardianSignature
    });

    await admission.save();
    res.status(201).json({ message: 'Admission form submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
