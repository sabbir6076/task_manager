const { isValidPriority, isValidDate, generateId, normalize } = require('./utils');

function addTask(tasks, title, desc, priority, dueDate) {
  if (!title.trim()) return { error: 'Title cannot be empty' };
  if (!isValidPriority(priority)) return { error: 'Invalid priority' };
  if (!isValidDate(dueDate)) return { error: 'Invalid date format (YYYY-MM-DD)' };

  const duplicate = tasks.find(t =>
    normalize(t.title) === normalize(title) && t.dueDate === dueDate
  );

  if (duplicate) return { error: 'Duplicate task exists' };

  const newTask = {
    id: generateId(tasks),
    title,
    description: desc,
    priority: priority.toLowerCase(),
    dueDate,
    status: 'Pending'
  };

  tasks.push(newTask);
  return { task: newTask };
}
function deleteTask(tasks, id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return { error: 'Task not found' };

  tasks.splice(index, 1);
  return { success: true };
}

function updateStatus(tasks, id, status) {
  const task = tasks.find(t => t.id === id);
  if (!task) return { error: 'Task not found' };

  task.status = status;
  return { success: true };
}

function searchTasks(tasks, query) {
  query = normalize(query);
  return tasks.filter(t =>
    normalize(t.title).includes(query) ||
    normalize(t.status).includes(query) ||
    normalize(t.priority).includes(query)
  );
}

function getGroupedTasks(tasks) {
  const order = ['high', 'medium', 'low'];
  return order.map(p => ({
    priority: p.toUpperCase(),
    tasks: tasks.filter(t => t.priority === p)
  }));
}

module.exports = { addTask, deleteTask, updateStatus, searchTasks, getGroupedTasks };