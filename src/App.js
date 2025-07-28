// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import StudentList from './components/StudentList';
import StudentListView from './components/StudentListView';
import AddStudentForm from './components/addStudentForm';
import EditStudentForm from './components/EditStudentForm';
import './App.css';

const App = () => {
  const studentsData = [
    { id: 1, name: 'Ali Raza', age: 20, course: 'React Basics', grade: 'A' },
    { id: 2, name: 'Abdullah', age: 22, course: 'Advanced CSS', grade: 'B' },
    { id: 3, name: 'Moheed', age: 21, course: 'JavaScript Fundamentals', grade: 'C' },
    { id: 4, name: 'Ali', age: 23, course: 'React Basics', grade: 'B' },
  ];

  // --- State Management ---
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : studentsData;
  });
  // Remove editing state, replace with formToShow state
  // const [editing, setEditing] = useState(false);
  const [formToShow, setFormToShow] = useState('none'); // 'none', 'add', 'edit'
  const initialFormState = { id: null, name: '', age: '', course: '', grade: '' };
  const [currentStudent, setCurrentStudent] = useState(initialFormState);
  
  // **NEW**: State for search term and view mode
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'

  // --- CRUD Functions ---
  const addStudent = (student) => {
    student.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    setStudents([...students, student]);
    setFormToShow('none'); // Hide form after adding
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    if (currentStudent.id === id) {
        setFormToShow('none');
        setCurrentStudent(initialFormState);
    }
  };

  const editRow = (student) => {
    setCurrentStudent({ ...student });
    setFormToShow('edit');
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map((student) => (student.id === id ? updatedStudent : student)));
    setFormToShow('none'); // Hide form after updating
  };

  // **NEW**: Sorting functions
  const sortByAge = () => {
    const sortedStudents = [...students].sort((a, b) => a.age - b.age);
    setStudents(sortedStudents);
  };

  const sortByGrade = () => {
    // Creating a copy and sorting alphabetically by grade
    const sortedStudents = [...students].sort((a, b) => a.grade.localeCompare(b.grade));
    setStudents(sortedStudents);
  };

  // **NEW**: Filter students based on the search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  return (
    <div className="App">
      <Header />
      <main className="container">
        <div className="form-section">
          <div className="form-buttons">
            <button onClick={() => setFormToShow('add')}>Add Student</button>
            <button
              onClick={() => setFormToShow('edit')}
              disabled={currentStudent.id === null}
            >
              Update Student
            </button>
          </div>
          {formToShow === 'add' && (
            <AddStudentForm addStudent={addStudent} onCancel={() => setFormToShow('none')} />
          )}
          {formToShow === 'edit' && (
            <EditStudentForm
              setEditing={setFormToShow}
              currentStudent={currentStudent}
              updateStudent={updateStudent}
            />
          )}
        </div>

        <div className="list-section">
          <h2>View Students</h2>

          {/* **NEW**: Search, Sort and View controls */}
          <div className="controls">
            <input
              type="text"
              placeholder="Search by name..."
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="sort-buttons">
              <button onClick={sortByAge}>Sort by Age</button>
              <button onClick={sortByGrade}>Sort by Grade</button>
            </div>
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('card')}
                className={viewMode === 'card' ? 'active' : ''}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'active' : ''}
              >
                List View
              </button>
            </div>
          </div>
          
          {viewMode === 'card' ? (
            <StudentList
              students={filteredStudents} // Pass the FILTERED list to the component
              onEdit={editRow}
              onDelete={deleteStudent}
            />
          ) : (
            <StudentListView
              students={filteredStudents}
              onEdit={editRow}
              onDelete={deleteStudent}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
