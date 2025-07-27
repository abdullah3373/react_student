// src/components/AddStudentForm.js
import React, { useState } from 'react';
import '../styles/Form.css'; // A shared stylesheet for forms

const AddStudentForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({ name: '', age: '', course: '', grade: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.age) {
        tempErrors.age = "Age is required.";
    } else if (isNaN(formData.age) || formData.age <= 0) {
        tempErrors.age = "Age must be a positive number.";
    }
    if (!formData.course) tempErrors.course = "Course is required.";
    if (!formData.grade) tempErrors.grade = "Grade is required.";
    
    setErrors(tempErrors);
    // Returns true if there are no errors, and false otherwise
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addStudent(formData);
      // Clear form fields
      setFormData({ name: '', age: '', course: '', grade: '' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form" noValidate>
      <h3>Add New Student</h3>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error-text">{errors.name}</p>}

      <input
        name="age"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      {errors.age && <p className="error-text">{errors.age}</p>}
      
      <input
        name="course"
        type="text"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
      />
      {errors.course && <p className="error-text">{errors.course}</p>}

      <input
        name="grade"
        type="text"
        placeholder="Grade"
        value={formData.grade}
        onChange={handleChange}
      />
      {errors.grade && <p className="error-text">{errors.grade}</p>}

      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;