const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

function loadTasks() {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };