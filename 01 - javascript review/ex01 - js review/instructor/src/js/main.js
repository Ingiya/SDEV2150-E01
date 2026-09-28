// main.js

// --------------------------------------------------
// STEP 1: Select DOM elements ONCE
// --------------------------------------------------
const btnRun     = document.querySelector('#btn-run');
const btnClear   = document.querySelector('#btn-clear');
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
    // instead of this for loop, this could also be tasks.map() !
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
function addMessage(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  demoOutput.appendChild(p);
}

// TODO: Test the addMessage function
addMessage(
  'This message was created with document.createElement,then added to the DOM by calling .appendChild on the demo output element.'
  ); // rather than writing text straight into .innerHTML or .textContent.
     // This approach explicitly treats the DOM as a node tree,
     // while the innerHTML/textContent injection approach treats HTML as text data.

// --------------------------------------------------
// STEP 7: Events – connect UI to behavior
// --------------------------------------------------
// Wire the buttons to functions that update the UI.

// TODO: Create a function runDemo()
// - Clear output
// - Add a few messages
// - Render the task list

function runDemo() {
  // If I want to update a display container, my first step
  // should always be clearing out whatever is already there.
  // That way, I don't risk accidentally appending to pre-existing HTML
  // instead of overwriting it!
  output.innerHTML = '';

  // the glory of modular logic:
  // now I have a write-once,-use-infinitely function to append text to the demo output box!
  addMessage('Running demo...');
  addMessage(formatResult('5 + 8', add(5, 8)));
  todoList.innerHTML = renderTaskList(tasks);
}

// TODO: Create a function clearUI()
// - Clear both output and todo list containers
function clearUI() {
  // when clearing/nuking/resetting UI, it's totally sensible to treat the HTML as raw text.
  // you don't really care about the existing inner node structure if you're just wiping it.
  demoOutput.innerHTML = '';
  todoList.innerHTML   = ''
}

// TODO: Add click listeners for btnRun and btnClear
btnRun.addEventListener('click', runDemo);
btnClear.addEventListener('click', clearUI);

/*
 ^ note the overall order in this file so far:
   A) define DOM elements
   B) set up helper functions
   C) attach functions to event listeners
  
  This makes things really readable / conceptually accessible for someone else
  stepping into this code! (Pretend for a moment it's not littered w/ explanatory comments.)
*/


// --------------------------------------------------
// STEP 8: Mini extension – Adding tasks
// --------------------------------------------------

todoAddBtn.addEventListener(
  'click',
  () => { // anonymous callback function, rather than a stored named one like runDemo
    const title = todoInput.value.trim(); // always trim whitespace, sanitise inputs, etc.
    if (!title) return; // if-return is often better than if-else, if you don't want subsequent code to execute
  
    tasks.push({ title, done: false });     // don't need to title: title, if the property name will be the same as the variable (in JS)
    todoList.innerHTML  = renderTaskList(tasks); // we updated data, so we re-render -> remember this! it's the core loop of responsive UI.
    todoInput.value = ''; // for form/input UI, always reset the input after submitting (successful submits, or any submits, depending on your case)
  }
)


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
