// src/components/EditStudentForm.js
import React, { useState, useEffect } from 'react';
import '../styles/Form.css'; // Reusing the same form stylesheet

const EditStudentForm = ({ currentStudent, updateStudent, setEditing }) => {
  const [student, setStudent] = useState(currentStudent);

  useEffect(() => {
    setStudent(currentStudent);
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(student.id, student);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>Edit Student</h3>
      <input
        name="name"
        type="text"
        value={student.name}
        onChange={handleChange}
      />
      <input
        name="age"
        type="number"
        min="0"
        value={student.age}
        onChange={handleChange}
      />
      <input
        name="course"
        type="text"
        value={student.course}
        onChange={handleChange}
      />
      <input
        name="grade"
        type="text"
        value={student.grade}
        onChange={handleChange}
      />
      <button type="submit">Update Student</button>
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
    </form>
  );
};

export default EditStudentForm;
