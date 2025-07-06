import React, { useState } from 'react';
import axios from 'axios';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    guardianName: '',
    dateOfBirth: '',
    sex: '',
    nationality: '',
    tempAddress: '',
    permAddress: '',
    tempMobile: '',
    permMobile: '',
    email: '',
    emailPassword: '',
    schoolName: '',
    schoolAddress: '',
    province: '',
    gpa: '',
    symbolNo: '',
    schoolType: '',
    guardianEmail: '',
    guardianMobile: '',
    guardianSignature: null,
    date: '',
    ppPhoto: null,
    citizenship: null,
    signature: null,
    checklist: {
      admitCard: false,
      gradesheet: false,
      birthCertificate: false,
      photos: false,
      citizenshipPhoto: false,
      otherDocs: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        checklist: { ...formData.checklist, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gpa = parseFloat(formData.gpa);
    if (gpa < 0 || gpa > 4) {
      alert('GPA must be between 0.0 and 4.0');
      return;
    }
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(formData.tempMobile) || !mobilePattern.test(formData.permMobile)) {
      alert('Mobile numbers must be 10 digits.');
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'checklist') {
        Object.entries(value).forEach(([cKey, cVal]) => {
          submitData.append(`checklist[${cKey}]`, cVal);
        });
      } else {
        submitData.append(key, value);
      }
    });

    try {

      await axios.post(`${import.meta.env.VITE_API_URL}/submit`, submitData);
      alert('Form submitted successfully!');

    } catch (error) {
      console.error(error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-tr from-purple-100 via-pink-100 to-gray-200">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-80 rounded-xl shadow-lg p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center border-b-2 border-purple-600 pb-4 mb-4">
          <img
            src="image copy.png"
            alt="Institute Logo"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-700 mr-4 mb-2 md:mb-0"
          />
          <div>
            <h1 className="text-2xl font-bold text-purple-800">Kalika Medical & Technical Institute</h1>
            <h3 className="text-lg font-medium">Admission Form – Civil (Academic Session 2082/83)</h3>
            <p className="text-sm text-gray-700">Please fill in all required fields. Incomplete or false entries may be rejected.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          {[
            { label: 'Full Name', name: 'name' },
            { label: "Father's Name", name: 'fatherName' },
            { label: "Mother's Name", name: 'motherName' },
            { label: "Guardian's Name", name: 'guardianName' },
            { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
            { label: 'Sex', name: 'sex', type: 'select', options: ['', 'Male', 'Female', 'Transgender'] },
            { label: 'Nationality', name: 'nationality' },
            { label: 'Temporary Address / Province', name: 'tempAddress' },
            { label: 'Permanent Address / Province', name: 'permAddress' },
            { label: 'Mobile No (Student)', name: 'tempMobile' },
            { label: 'Mobile No (Guardian)', name: 'permMobile' },
            { label: 'Email ID', name: 'email' },
            { label: 'Email Password', name: 'emailPassword', type: 'password' },
            { label: 'School Name', name: 'schoolName' },
            { label: 'School Address / Province', name: 'schoolAddress' },
            { label: 'Symbol Number', name: 'symbolNo' },
            { label: 'GPA', name: 'gpa', type: 'number' },
            { label: 'School Type', name: 'schoolType', type: 'select', options: ['', 'Private', 'Public'] },
            { label: 'Guardian Email', name: 'guardianEmail' },
            { label: 'Mobile No', name: 'guardianMobile' },
            { label: 'Date', name: 'date', type: 'date' },
          ].map(({ label, name, type = 'text', options }) => (
            <div key={name} className="flex flex-col w-full md:w-[48%]">
              <label className="font-semibold mb-1">{label}</label>
              {type === 'select' ? (
                <select
                  name={name}
                  required
                  onChange={handleChange}
                  value={formData[name]}
                  className="p-2 border rounded-lg"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt || '--Select--'}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required={type !== 'password'}
                  className="p-2 border rounded-lg"
                />
              )}
            </div>
          ))}

          {/* File Uploads */}
          {[{ label: 'PP Size Photo', name: 'ppPhoto' },
            { label: 'Guardian’s Citizenship (Photo)', name: 'citizenship' },
            { label: 'Candidate’s Signature', name: 'signature' },
            { label: 'Guardian Signature', name: 'guardianSignature' }].map(({ label, name }) => (
            <div key={name} className="flex flex-col w-full md:w-[48%]">
              <label className="font-semibold mb-1">{label}</label>
              <input type="file" name={name} accept="image/*" required onChange={handleChange} className="p-2 border rounded-lg" />
            </div>
          ))}

          {/* Guardian Declaration */}
          <div className="w-full">
            <div className="text-purple-700 font-semibold text-lg border-b-2 border-purple-600 pb-1 my-4">Guardian Declaration</div>
            <p className="text-sm p-3 bg-gray-100 border-l-4 border-purple-600 rounded">
              I certify that my son/daughter/ward is applying with my permission. I take responsibility for their conduct, behavior, and fee payments. I understand attendance requirements and acknowledge that false information may lead to cancellation of admission.
            </p>
          </div>

          {/* Checklist */}
          <div className="w-full">
            <div className="text-purple-700 font-semibold text-lg border-b-2 border-purple-600 pb-1 my-4">Checklist</div>
            {[
              { label: 'SEE Admit Card', name: 'admitCard' },
              { label: 'Gradesheet', name: 'gradesheet' },
              { label: 'Birth Certificate', name: 'birthCertificate' },
              { label: '2 PP Size Photos', name: 'photos' },
              { label: 'Guardian’s Citizenship Photo', name: 'citizenshipPhoto' },
              { label: 'Other Documents (if any)', name: 'otherDocs' },
            ].map(({ label, name }) => (
              <label key={name} className="block my-1">
                <input
                  type="checkbox"
                  name={name}
                  checked={formData.checklist[name] || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>

          <button type="submit" className="w-full bg-purple-800 text-white py-3 rounded-lg mt-6 hover:bg-purple-900">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
