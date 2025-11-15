import "./Ticket.css";
import React, { useState } from "react";

function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Data:", formData);
    alert("Ticket submitted successfully!");
    
  };

  return (
    <div className="create-ticket-page">
      <div className="create-ticket">
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          <div>
            <label>Department</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">Information Technology</option>
              <option value="HR">Human Resource</option>
              <option value="OP">Operations</option>
              <option value="MR">Marketing</option>
              <option value="FIN">Finance</option>
              <option value="CS">Customer Service</option>
              <option value="R&D">Research & Development</option>
              <option value="ADMIN">Administration</option>
            </select>
          </div>

          <button type="submit">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;