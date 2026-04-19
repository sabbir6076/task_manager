const readline = require('readline');
const { loadTasks, saveTasks } = require('./fileHandler');
const { addTask, deleteTask, updateStatus, searchTasks, getGroupedTasks } = require('./taskService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = loadTasks();

function menu() {
  console.log('\n========= TASK MANAGER =========');
  console.log('1. Add Task');
  console.log('2. View Tasks');
  console.log('3. Search Task');
  console.log('4. Update Task Status');
  console.log('5. Delete Task');
  console.log('6. Exit');
  console.log('================================');

  rl.question('Enter your choice: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice) {
    case '1': return addTaskCLI();
    case '2': return viewTasks();
    case '3': return searchCLI();
    case '4': return updateCLI();
    case '5': return deleteCLI();
    case '6': rl.close(); break;
    default:
      console.log('Invalid choice');
      menu();
  }
}

function addTaskCLI() {
  rl.question('Title: ', title => {
    rl.question('Description: ', desc => {
      rl.question('Priority (Low/Medium/High): ', priority => {
        rl.question('Due Date (YYYY-MM-DD): ', date => {

          const result = addTask(tasks, title, desc, priority, date);

          if (result.error) {
            console.log('Error:', result.error);
          } else {
            saveTasks(tasks);
            console.log('Task added successfully!');
          }

          menu();
        });
      });
    });
  });
}

function viewTasks() {
  const grouped = getGroupedTasks(tasks);

  grouped.forEach(group => {
    console.log(`\n${group.priority} PRIORITY`);
    group.tasks.forEach((t, i) => {
      console.log(`${i + 1}. [${t.id}] ${t.title} | ${t.status} | Due: ${t.dueDate}`);
    });
  });

  menu();
}

function searchCLI() {
  rl.question('Search: ', query => {
    const results = searchTasks(tasks, query);

    results.forEach(t => {
      console.log(`[${t.id}] ${t.title} | ${t.status} | ${t.priority}`);
    });

    menu();
  });
}

function updateCLI() {
  rl.question('Task ID: ', id => {
    rl.question('New Status (Pending/In Progress/Completed): ', status => {
      const result = updateStatus(tasks, Number(id), status);

      if (result.error) console.log(result.error);
      else {
        saveTasks(tasks);
        console.log('Updated successfully');
      }

      menu();
    });
  });
}

function deleteCLI() {
  rl.question('Task ID: ', id => {
    rl.question('Are you sure? (y/n): ', ans => {
      if (ans.toLowerCase() === 'y') {
        const result = deleteTask(tasks, Number(id));

        if (result.error) console.log(result.error);
        else {
          saveTasks(tasks);
          console.log('Deleted successfully');
        }
      }
      menu();
    });
  });
}

menu();