// main.js

// --------------------------------------------------
// STEP 1: Select DOM elements ONCE
// --------------------------------------------------
const runBtn     = document.querySelector('#btn-run');
const clearBtn   = document.querySelector('#btn-clear');
const demoOutput = document.querySelector('#output');

const todoAddBtn = document.querySelector('#btn-add');
const todoInput  = document.querySelector('#txt-task');
const todoList   = document.querySelector('#todo-list'); // fixed!

// --------------------------------------------------
// STEP 2: Variables and template strings
// --------------------------------------------------
// Create a constant and a variable, then display
// them using a template string.

// TODO: Create a constant named course
// TODO: Create a variable named topic
const course = 'SDEV2150';
const topic  = 'JS review';

// TODO: Use a template string to display both values
demoOutput.innerHTML = `<p>Course: ${course} | Topic: ${topic}</p>`


// --------------------------------------------------
// STEP 3: Functions and return values
// --------------------------------------------------
// Write a function that adds two numbers and
// another function that formats a label/value pair.

// TODO: Create a function add(a, b)
function add(a, b) {
  return a + b;
}

// TODO: Create an arrow function formatResult(label, value)
const formatResult = (label, value) => {
  return `${label}: ${value}`
}

// TODO: Call the functions and display the result
demoOutput.innerHTML += `<p>${formatResult('2 + 3', add(2, 3))}</p>`

// --------------------------------------------------
// STEP 4: Arrays, objects, and iteration
// --------------------------------------------------
// Create an array of task objects and count
// how many are marked as done.

/*
  NOTE: about storing an (e.g.) array in a const:
  -> Arrays are mutable types, meaning I can change what's in them.
     By writing e.g. "const arr = []", all I'm doing is saying,
     "The variable {arr} points to *that specific array*."
     Because the array is a mutable data type, I can still
     do stuff with it. What I *can't* do is reassign anything else to
     that {arr} variable.
*/

// TODO: Create an array named tasks
// Each task should have: title (string), done (boolean)
const tasks = [
  { title: 'Install dependencies', done: true },
  // null, // uncomment this to observe how for-loop iteration
           // can result in partially constructed data,
           // while map/filter are all-or-nothing (good: only modifies/creates data if no error)
  { title: 'Run dev server', done: true },
  { title: 'Complete the demo', done: false },
]

// TODO: Use a loop to count completed tasks
let completedCount = 0;
for (const task of tasks) {
  if (task.done) {
    completedCount++
    console.log(completedCount);
  };
}

// or do it like a pro: newArr = Arr.filter(element => (conditionalExpression))
//                   -> will create newArr with only Arr elements for which conditionalExpression is true!
//                   -> is "all-or-nothing", i.e. if an exception is thrown during the process, newArr is not created
// here, I don't bother storing the new array because I just want its .length right away.
completedCount = tasks.filter(task => task.done === true).length;

// TODO: Display: "Completed: X of Y"
demoOutput.textContent = `Completed: ${completedCount} tasks of ${tasks.length}.`


// --------------------------------------------------
// STEP 5: Problem solving – build HTML from data
// --------------------------------------------------
// Build a function that converts the tasks array
// into an HTML list using a loop.

// TODO: Create a function renderTaskList(items)
// - Start with '<ul>'
// - Loop over items
// - Add <li> elements with a class of 'done' or 'todo'
// - Close the list and return the string
function renderTaskList(items) {
  // I should open the list, add indiv. list items, then close the list
  let html = '<ul>';
  for (const item of items) {
    const status = item.done ? 'done' : 'todo'; // ternary, replaces if/else -> 
                                                // (condition ? resultIfTrue : resultIfFalse)
    html += `<li class="${status}">${item.title}</li>`
  }
  html += '</ul>';
  return html;
}

// TODO: Render the task list inside the list container
todoList.innerHTML = renderTaskList(tasks);

// --------------------------------------------------
// STEP 6: DOM manipulation with createElement
// --------------------------------------------------
// Create and append elements instead of using innerHTML.

// TODO: Create a function addMessage(message)
// - Create a <p> element
// - Set its textContent
// - Append it to the output element

// TODO: Test the addMessage function

// --------------------------------------------------
// STEP 7: Events – connect UI to behavior
// --------------------------------------------------
// Wire the buttons to functions that update the UI.

// TODO: Create a function runDemo()
// - Clear output
// - Add a few messages
// - Render the task list

// TODO: Create a function clearUI()
// - Clear both output and todo list containers

// TODO: Add click listeners for btnRun and btnClear

// --------------------------------------------------
// STEP 8: Mini extension – Adding tasks
// --------------------------------------------------

// --------------------------------------------------
// STEP 9: Student Exercise
// --------------------------------------------------
// Complete these AFTER the demo:

// 1. Create a function toggleDone(title)
//    - Find a task by title
//    - Flip its done value (true/false)

// 2. Update renderTaskList() to show '(done)' or '(todo)'

// 3. Add event delegation to the <ul>
//    - When a list item is clicked:
//      * Toggle the task
//      * Re-render the list

// 4. Stretch goals:
//    - Display a chekcbox next to each task to represent done/todo 
//      (checking/unchecking it toggles the state)
//    - Update the UI so that pressing enter in the text input adds 
//      the task (notice we aren't using a form
//    - Display a summary line above the list
//      e.g. "Completed: 2 of 3"
