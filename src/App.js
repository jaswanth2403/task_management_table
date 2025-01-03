import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskTitle: 'Task Example 1',
      taskId: '1',
      status: 'In Progress',
      assignedMembers: 'Team Member 1',
      dueDate: '2024-10-15',
      isAssigned: true,
      estimatedHours: '5:30',
      priority: 'High',
      createdOn: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      taskTitle: 'Task Example 2',
      taskId: '2',
      status: 'Uninitiated',
      assignedMembers: 'Team Member 2',
      dueDate: '2024-10-20',
      isAssigned: false,
      estimatedHours: '3:15',
      priority: 'Medium',
      createdOn: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      taskTitle: 'Task Example 3',
      taskId: '3',
      status: 'In Progress',
      assignedMembers: 'Team Member 3',
      dueDate: '2024-10-22',
      isAssigned: true,
      estimatedHours: '4:00',
      priority: 'Low',
      createdOn: new Date().toLocaleDateString(),
    },
  ]);

  const [newTask, setNewTask] = useState({
    taskTitle: '',
    taskId: '',
    status: 'Not Started',
    assignedMembers: 'Team Member 1',
    dueDate: '',
    isAssigned: false,
    estimatedHours: '0:00',
    priority: 'Low',
    createdOn: new Date().toLocaleDateString(),
  });

  
  const [filters, setFilters] = useState({
    taskTitle: '',
    taskId: '',
    status: '',
    assignedMembers: '',
    dueDate: '',
    isAssigned: '',
    estimatedHours: '',
    priority: '',
    createdOn: '',
  });


  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

 
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.taskTitle || task.taskTitle.toLowerCase().includes(filters.taskTitle.toLowerCase())) &&
      (!filters.taskId || task.taskId === filters.taskId) &&
      (!filters.status || task.status === filters.status) &&
      (!filters.assignedMembers || task.assignedMembers === filters.assignedMembers) &&
      (!filters.dueDate || task.dueDate === filters.dueDate) &&
      (!filters.isAssigned || task.isAssigned.toString() === filters.isAssigned) &&
      (!filters.estimatedHours || task.estimatedHours === filters.estimatedHours) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.createdOn || task.createdOn === filters.createdOn)
    );
  });


  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { ...newTask, id: tasks.length + 1, taskId: (tasks.length + 1).toString() },
    ]);
    setNewTask({
      taskTitle: '',
      taskId: '',
      status: 'Not Started',
      assignedMembers: 'Team Member 1',
      dueDate: '',
      isAssigned: false,
      estimatedHours: '0:00',
      priority: 'Low',
      createdOn: new Date().toLocaleDateString(),
    });
  };


  const handleEditTask = (id) => {
    const updatedTask = tasks.find((task) => task.id === id);
    setNewTask(updatedTask);
    setTasks(tasks.filter((task) => task.id !== id));
  };


  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <div className="task-table">
        <h2>Task Management Table</h2>

        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Task Title</th>
              <th>Task ID</th>
              <th>Status</th>
              <th>Assigned Members</th>
              <th>Due Date</th>
              <th>Is Assigned</th>
              <th>Estimated Hours</th>
              <th>Priority</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
            <tr>
              {/* filters part     ------------------------------------------------------------------------------------------------------ */}
              <th></th>
              <th>
                <input
                  type="text"
                  name="taskTitle"
                  value={filters.taskTitle}
                  onChange={handleFilterChange}
                  placeholder="Filter Task Title"
                  className="filter-input"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="taskId"
                  value={filters.taskId}
                  onChange={handleFilterChange}
                  placeholder="Filter Task ID"
                  className="filter-input"
                />
              </th>
              <th>
                <select name="status" value={filters.status} onChange={handleFilterChange} className="filter-input">
                  <option value="">All</option>
                  <option value="Uninitiated">Uninitiated</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </th>
              <th>
                <select
                  name="assignedMembers"
                  value={filters.assignedMembers}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  <option value="">All</option>
                  <option value="Team Member 1">Team Member 1</option>
                  <option value="Team Member 2">Team Member 2</option>
                  <option value="Team Member 3">Team Member 3</option>
                  <option value="Team Member 4">Team Member 4</option>
                </select>
              </th>
              <th>
                <input
                  type="date"
                  name="dueDate"
                  value={filters.dueDate}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </th>
              <th>
                <select
                  name="isAssigned"
                  value={filters.isAssigned}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>
              <th>
                <input
                  type="text"
                  name="estimatedHours"
                  value={filters.estimatedHours}
                  onChange={handleFilterChange}
                  placeholder="Filter Hours (e.g., 4:30)"
                  className="filter-input"
                />
              </th>
              <th>
                <select name="priority" value={filters.priority} onChange={handleFilterChange} className="filter-input">
                  <option value="">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </th>
              <th>
                <input
                  type="date"
                  name="createdOn"
                  value={filters.createdOn}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskTitle}</td>
                <td>{task.taskId}</td>
                <td>{task.status}</td>
                <td>{task.assignedMembers}</td>
                <td>{task.dueDate}</td>
                <td>{task.isAssigned.toString()}</td>
                <td>{task.estimatedHours}</td>
                <td>{task.priority}</td>
                <td>{task.createdOn}</td>
                <td>
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="task-form">
        {/* 2nd part  Add Task Form ----------------------------------------------------------------------------------------------------------------------*/}
        <h3>Add New Task</h3>
        <div>
          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.taskTitle}
              onChange={(e) => setNewTask({ ...newTask, taskTitle: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Task ID"
              value={newTask.taskId}
              onChange={(e) => setNewTask({ ...newTask, taskId: e.target.value })}
            />
          </div>
          <div>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <select
              value={newTask.assignedMembers}
              onChange={(e) => setNewTask({ ...newTask, assignedMembers: e.target.value })}
            >
              <option value="Team Member 1">Team Member 1</option>
              <option value="Team Member 2">Team Member 2</option>
              <option value="Team Member 3">Team Member 3</option>
              <option value="Team Member 4">Team Member 4</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
          </div>
          <div>
            <select
              value={newTask.isAssigned}
              onChange={(e) => setNewTask({ ...newTask, isAssigned: e.target.value === 'true' })}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Estimated Hours (e.g., 4:30)"
              value={newTask.estimatedHours}
              onChange={(e) => setNewTask({ ...newTask, estimatedHours: e.target.value })}
            />
          </div>
          <div>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
