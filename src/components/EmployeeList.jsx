import React, { useState } from 'react';
import './EmployeeList.css'; // CSS for the table

const EmployeeList = ({ employees, updateEmployee, deleteEmployee }) => {
  const [editId, setEditId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});

  const handleEdit = (employee) => {
    setEditId(employee._id);
    setEditedEmployee(employee);
  };

  const handleSave = () => {
    updateEmployee(editId, editedEmployee);
    setEditId(null);
  };

  const handleChange = (e, field) => {
    setEditedEmployee({ ...editedEmployee, [field]: e.target.value });
  };

  return (
    <div className="list-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>
                {editId === employee._id ? (
                  <input
                    value={editedEmployee.name}
                    onChange={(e) => handleChange(e, 'name')}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editId === employee._id ? (
                  <input
                    value={editedEmployee.position}
                    onChange={(e) => handleChange(e, 'position')}
                  />
                ) : (
                  employee.position
                )}
              </td>
              <td>
                {editId === employee._id ? (
                  <input
                    value={editedEmployee.department}
                    onChange={(e) => handleChange(e, 'department')}
                  />
                ) : (
                  employee.department
                )}
              </td>
              <td>
                {editId === employee._id ? (
                  <input
                    type="number"
                    value={editedEmployee.salary}
                    onChange={(e) => handleChange(e, 'salary')}
                  />
                ) : (
                  `$${employee.salary}`
                )}
              </td>
              <td>
                {editId === employee._id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                )}
                <button onClick={() => deleteEmployee(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
