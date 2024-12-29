import React, { useState } from "react";
import "./TaskOrganise.css";
import Switch from "@mui/material/Switch";
import api from "./frontToBackend/api";
import { useNavigate } from "react-router-dom";

const TaskOrganise = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [prioOpen, setPrioOpen] = useState(false);
  const [stats, IsStat] = useState(false);
  const [taskOpen, openTask] = useState(false);
  const [formData, setFormData] = useState({
    username: "", 
    task_name: "",
    priority: "5",
    status: "1",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
  });

  const navigate = useNavigate()

  const toggleDropdown = (dropdown) => {
    if (dropdown === "sort") {
      setSortOpen(!sortOpen);
      setPrioOpen(false);
      IsStat(false);
    }
    if (dropdown === "priority") {
      setSortOpen(false);
      setPrioOpen(!prioOpen);
      IsStat(false);
    }
    if (dropdown === "status") {
      setSortOpen(false);
      setPrioOpen(false);
      IsStat(!stats);
    }
  };

  const openAddTask = () => openTask(true);
  const closeAddTask = () => openTask(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.checked ? 1 : 0 });
  };

  const handleDateTimeChange = (e, field) => {
    const [date, time] = e.target.value.split("T");
    setFormData({
      ...formData,
      [`${field}_date`]: date,
      [`${field}_time`]: time,
    });
  };

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/user/taskCreation", formData);
      console.log("Task created successfully:", res.data);
      closeAddTask();
    } catch (error) {
      console.error("Error creating task:", error);
      console.log(formData)
    }
  };

  return (
    <div className="task-settings">
      <div className="add-task" onClick={openAddTask}>
        <p>+ ADD TASK</p>
      </div>

      <div className="task-organise">
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => toggleDropdown("sort")}>
            Sort
          </button>
          {sortOpen && (
            <div className="dropdown-menu">
              <p>Start time: ASC</p>
              <p>Start time: DESC</p>
              <p>End time: ASC</p>
              <p>End time: DESC</p>
              <button className="remove-btn">Remove sort</button>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("priority")}
          >
            Priority
          </button>
          {prioOpen && (
            <div className="dropdown-menu">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <button className="remove-btn">Remove filter</button>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("status")}
          >
            Status
          </button>
          {stats && (
            <div className="dropdown-menu">
              <p className="pending-status active-status">Pending !</p>
              <p className="finished-status active-status">Finished ✔</p>
              <button className="remove-btn">Remove filter</button>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {taskOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add a New Task</h2>
            <p>Task ID: 3</p>
            <form onSubmit={submitTask}>
              <label>
                Title:
                <input
                  type="text"
                  value={formData.task_name}
                  name="task_name"
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Priority:
                <select
                  value={formData.priority}
                  name="priority"
                  onChange={handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>

              <label>
                Status:
                <div className="status-toggle">
                  <span>Pending</span>
                  <Switch
                    checked={formData.status === 1}
                    onChange={handleStatusChange}
                  />
                  <span>Finished</span>
                </div>
              </label>

              <div className="datetime-set">
                <label className="datetime">
                  Start time:
                  <input
                    type="datetime-local"
                    onChange={(e) => handleDateTimeChange(e, "start")}
                  />
                </label>

                <label className="datetime">
                  End time:
                  <input
                    type="datetime-local"
                    onChange={(e) => handleDateTimeChange(e, "end")}
                  />
                </label>
              </div>

              <div className="button-group">
                <button type="submit" className="update-button">
                  Add Task
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeAddTask}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskOrganise;

