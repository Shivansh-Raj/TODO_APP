import React from 'react';
import './Dashboard.css';
import Navbar from './Navbar';
function Dashboard() {
  return (
    <div className="db_cont">
      {/* nb */}
    {/* <div class="nb_divider"></div> */}
      <Navbar/>

      {/* Dashboard Content */}
      <div className="content">
        <h1>Dashboard</h1>

        {/* task Section */}
        <div className="task_section">
          <div className="task_card">
            <h2>25</h2>
            <p>Total tasks</p>
          </div>
          <div className="task_card">
            <h2>40%</h2>
            <p>Tasks completed</p>
          </div>
          <div className="task_card">
            <h2>60%</h2>
            <p>Tasks Pending</p>
          </div>
          <div className="task_card">
            <h2>3.5 hrs</h2>
            <p>Average time per completed task</p>
          </div>
        </div>

        {/* left Task task */}
        <div className="left-task">
          <h2>Pending tasks</h2>
          <div className="left-task_stats">
            <div className="stat-item">
              <h2>15</h2>
              <p>Pending Tasks</p>
            </div>
            <div className="stat-item">
              <h2>56 hrs</h2>
              <p>Total time lapsed</p>
            </div>
            <div className="stat-item">
              <h2>24 hrs</h2>
              <p>Total time to finish</p>
            </div>
          </div>
        </div>

        {/* Task Table */}
        <table className="task-table">
          <thead>
            <tr>
              <th>Task priority</th>
              <th>left tasks</th>
              <th>Time lapsed (hrs)</th>
              <th>Time to finish (hrs)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>3</td>
              <td>12</td>
              <td>8</td>
            </tr>
            <tr>
              <td>2</td>
              <td>5</td>
              <td>6</td>
              <td>3</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1</td>
              <td>8</td>
              <td>7</td>
            </tr>
            <tr>
              <td>4</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>5</td>
              <td>6</td>
              <td>30</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;