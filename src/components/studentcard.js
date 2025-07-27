// src/components/StudentCard.js
import React from 'react';
import '../styles/studentCard.css'; // We will create this CSS file later

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Grade:</strong> {student.grade}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student.id)}>Delete</button>
      </div>
    </div>
  );
};

export default StudentCard;