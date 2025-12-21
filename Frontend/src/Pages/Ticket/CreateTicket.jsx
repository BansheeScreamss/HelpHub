import "./Ticket.css";
import React, { useState } from "react";

function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  // Handle all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----- Submit Ticket -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FRONTEND VALIDATION
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.priority
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Create a temporary ticket object — backend-ready
    const ticketData = {
      id: Date.now(), // a simple unique ID for frontend (good enough)
      ...formData,
      date: new Date().toISOString(),
      status: "Pending",
    };

    console.log("Ticket Submitted:", ticketData);

    // BACKEND READY — this is where your backend call will go:
    // ---------------------------------------------------------
    // await axios.post("http://localhost:8000/api/tickets", ticketData);
    // ---------------------------------------------------------

    alert("Ticket submitted successfully!");

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "",
    });
  };

  return (
    <div className="create-ticket-page">
      <div className="create-ticket">
        <h2>Create New Ticket</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          {/* Department */}
          <div className="form-group">
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

          {/* Priority Selector */}
          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-ticket-btn">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
