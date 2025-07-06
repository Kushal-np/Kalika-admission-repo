import React, { useState } from 'react';
import axios from 'axios';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    dateOfBirth: "",
    sex: "",
    nationality: "",
    tempAddress: "",
    permAddress: "",
    tempMobile: "",
    permMobile: "",
    email: "",
    emailPassword: "",
    schoolName: "",
    schoolAddress: "",
    province: "",
    gpa: "",
    symbolNo: "",
    schoolType: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post(`${import.meta.env.VITE_API_URL}/submit`, formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-full max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">Admission Form</h1>
      {Object.keys(formData).map((field) => (
        <input
          key={field}
          name={field}
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 mb-2 border"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-4">Submit</button>
    </form>
  );
};

export default AdmissionForm;
