import Admission from '../models/Admission.js';

export const submitForm = async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json({ message: "Admission form submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
