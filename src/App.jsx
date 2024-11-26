import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css'; // Add this CSS for styling

const App = () => {
  const [employees, setEmployees] = useState([]);

  // Backend URL
  const backendUrl = 'https://backend-eiub.onrender.com/api/employees';

  // Fetch employees from the backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(backendUrl);
    const data = await response.json();
    setEmployees(data);
  };

  // Add a new employee
  const addEmployee = async (employee) => {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    const newEmployee = await response.json();
    setEmployees([...employees, newEmployee]);
  };

  // Update an existing employee
  const updateEmployee = async (id, updatedEmployee) => {
    await fetch(`${backendUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    });
    fetchEmployees();
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    await fetch(`${backendUrl}/${id}`, {
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
