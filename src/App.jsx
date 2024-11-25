import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css'; // Add this CSS for styling

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('http://localhost:5000/api/employees');
    const data = await response.json();
    setEmployees(data);
  };

  const addEmployee = async (employee) => {
    const response = await fetch('http://localhost:5000/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    const newEmployee = await response.json();
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = async (id, updatedEmployee) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    });
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: 'DELETE',
    });
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Employee Management System</h1>
      <EmployeeForm addEmployee={addEmployee} />
      <EmployeeList
        employees={employees}
        updateEmployee={updateEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
};

export default App;
