import React, { useState } from "react";
import "./Department.css";

function Department() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Information Technology", staff: ["Tony", "Phineas", "Ferb"] },
    { id: 2, name: "Human Resource", staff: ["Buford", "Stacy", "Isabella"] },
    { id: 3, name: "Finance", staff: ["Luffy", "Zoro", "Levi"] },
    { id: 4, name: "Administration", staff: ["Wanda","Candace"] },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [deptName, setDeptName] = useState("");
  const [staffInput, setStaffInput] = useState("");
  const [staffList, setStaffList] = useState([]);

  const [editingDept, setEditingDept] = useState(null); // track department being edited

  // Add single staff
  const handleAddStaff = () => {
    if (staffInput.trim() !== "") {
      setStaffList([...staffList, staffInput.trim()]);
      setStaffInput("");
    }
  };

  // Add or Update department
  const handleAddOrUpdateDepartment = () => {
    if (deptName.trim() === "" || staffList.length === 0) {
      alert("Please enter department name and at least one staff.");
      return;
    }

    if (editingDept) {
      // update existing
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDept.id
            ? { ...dept, name: deptName.trim(), staff: staffList }
            : dept
        )
      );
      setEditingDept(null);
    } else {
      // add new
      const newDept = {
        id: departments.length + 1,
        name: deptName.trim(),
        staff: staffList,
      };
      setDepartments([...departments, newDept]);
    }

    setDeptName("");
    setStaffList([]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setDeptName("");
    setStaffList([]);
    setStaffInput("");
    setEditingDept(null);
    setShowForm(false);
  };

  // Delete department
  const handleDelete = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  // Edit department (fill form with existing values)
  const handleEdit = (dept) => {
    setEditingDept(dept);
    setDeptName(dept.name);
    setStaffList(dept.staff);
    setShowForm(true);
  };

  return (
    <div className="department-page">
      <h2 className="department-title">Departments</h2>

      <div className="department-list">
        {departments.map((dept) => (
          <div className="department-card" key={dept.id}>
            <h3 className="dept-name">{dept.name}</h3>
            <p className="dept-staff">
              <strong>Staff:</strong> {dept.staff.join(", ")}
            </p>
            <div className="dept-actions">
              <button className="btn edit-btn" onClick={() => handleEdit(dept)}>
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => handleDelete(dept.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Department Section */}
      <div className="add-department-section">
        {!showForm ? (
          <button className="btn add-btn" onClick={() => setShowForm(true)}>
            + Add Department
          </button>
        ) : (
          <div className="add-form">
            <input
              type="text"
              placeholder="Enter Department Name"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            />
            <div className="staff-input-box">
              <input
                type="text"
                placeholder="Enter Staff Name"
                value={staffInput}
                onChange={(e) => setStaffInput(e.target.value)}
              />
              <button className="btn staff-add-btn" onClick={handleAddStaff}>
                + Add Staff
              </button>
            </div>
            <div className="staff-list">
              {staffList.map((s, index) => (
                <span key={index} className="staff-chip">
                  {s}
                  <button
                    className="remove-staff-btn"
                    onClick={() =>
                      setStaffList(staffList.filter((_, i) => i !== index))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="form-actions">
              <button className="btn cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="btn done-btn"
                onClick={handleAddOrUpdateDepartment}
              >
                {editingDept ? "Update" : "Done"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Department;
