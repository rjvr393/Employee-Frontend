import React, { useState } from 'react';
import './EmployeeForm.css'; // CSS for the form

const EmployeeForm = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);
    setEmployee({ name: '', position: '', department: '', salary: '' });
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
