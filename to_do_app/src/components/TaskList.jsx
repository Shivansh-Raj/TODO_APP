import {React, useEffect, useState} from 'react';
import './TaskList.css';
import Switch from '@mui/material/Switch';
import TaskOrganise from './TaskOrganise';
import Navbar from './Navbar';
import api from './frontToBackend/api';
function TaskList() {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState({});
  
    const openModal = () => setIsOpen(true);
    // const openAddTask = () => setTaskOpen(true);
    const closeModal = () => setIsOpen(false);
    // const closeAddTask = () => setTaskOpen(false);

  useEffect (() => {
    const get_tasks = async() => {
      try {
        const res = await api.get('/api/task_set/69')
        // console.log(res.data)
        setTasks(res.data)
      } catch (error) {
        alert(error);
      }
    }
    get_tasks()
  },[])
  useEffect(() => {
    console.log(tasks); 
  }, [tasks]);

  return (
    <div className="db_cont">
      {/* nb */}
      <Navbar/>

      <div className="content">
        <h1>TASK-LIST</h1>
            <TaskOrganise/>

        {/* task Section */}
        <div className="task_section">

          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="task_card">
                <div className="task-details">
                  <p className="task-id">Task I.D: {task.id}</p>
                  <p className="task-name">{task.task_name}</p>
                  <div className="task-stats">
                    <p className={`task-stat ${task.status === 0 ? 'active' : ''}`}>
                      {task.status === 0 ? 'Pending' : 'Completed'}
                    </p>
                    <p className="task-prio">Priority: {task.priority}</p>
                  </div>
                  <div className="task-schedule">
                    <div className="task-starting">
                      <b><p>Start</p></b>
                      <div className="task-start">
                        {new Date(task.end_date + ' ' + task.end_time).toLocaleString()}
                      </div>
                    </div>
                    <div className="task-finishing">
                      <b><p>Finish</p></b>
                      <div className="task-finish">
                        {new Date(task.end_date + ' ' + task.end_time).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="task-modify">
                  <div className="task-edit" onClick={openModal}>Edit</div>
                  <div className="task-delete">Delete</div>
                </div>
              </div>
            ))
          ) : (
            <h1>Hurray!! No got no Task at the moment:)</h1>
          )}
        </div>

      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Task</h2>
            <p>Task ID: 3</p>
            <form>
              <label>
                Title:
                <input type="text" defaultValue="Book travel tickets" />
              </label>

              <label>
                Priority:
                <select defaultValue="4">
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
                  <Switch/>
                  <span>Finished</span>
                </div>
              </label>
            <div className='datetime-set'>
              <label className='datetime'>
                Start time:
                <input type="datetime-local" />
              </label>

              <label className='datetime'>
                End time:
                <input type="datetime-local" />
              </label>
            </div>
              <div className="button-group">
                <button type="submit" className="update-button">
                  Update
                </button>
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      

    </div>


  );
}

export default TaskList;