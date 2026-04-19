function isValidPriority(priority) {
  return ['low', 'medium', 'high'].includes(priority.toLowerCase());
}

function isValidDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function generateId(tasks) {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 101;
}

function normalize(str) {
  return str.toLowerCase();
}

module.exports = { isValidPriority, isValidDate, generateId, normalize };