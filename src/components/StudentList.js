// src/components/StudentList.js
import React from 'react';
import StudentCard from './studentcard'; // CORRECTED: The path is now a string in quotes
import '../styles/StudentList.css';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="student-list">
      {students.map(student => (
        <StudentCard
          key={student.id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StudentList;