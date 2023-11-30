/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// What to add and fix
//  1. Responsive
// 
//✅3.Task count
//✅4. empty state
//      Image not displaying
//      When ClearAll does not work
//✅5. branding
//      5.1 Pooh favicon
//✅6. Copyrights
//✅ 7.Scroll bar

// Citations
// 1. Press enter:https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box


// Constants
const appID = "app";
const headingText = "To do. To done. ✅";

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


// DOM Elements
let appContainer = document.getElementById(appID);

//
// Functions
//

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  h1.innerText = headingText;
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}

//
//Form submit on top to collect user Input ------------------------------------------------------
//
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    add_todo();
  }
});

const formSubmit = document.querySelector(".row");
formSubmit.addEventListener("submit", add_todo);

function add_todo(event){
  event.preventDefault();
  if(inputBox.value === ""){
    alert("You must write something");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.setAttribute("id", "todo-box");
    li.className = "unchecked";
    listContainer.appendChild(li);

    let this_button = document.createElement("button");
    this_button.innerHTML = "\u00d7";
    li.appendChild(this_button);
  }
  
  inputBox.value = "";
  AllChecks();
}


//
//Adding removing function -------------------------------------------------------------
//
listContainer.addEventListener("click", removeTodo, false);

function removeTodo(event){
  if (event.target.tagName === "LI"){
    event.target.classList.toggle("checked");
  }
  // link this with the closing animation????
  else if (event.target.tagName === "BUTTON"){
    let exitingItems = event.target.parentElement;
    // exitingItems.style.animation = "transitionOut";
    event.target.parentElement.setAttribute("id", "removing")
    event.target.parentElement.remove();

    
  }
  AllChecks();
}



// 
// Add clear everything -----------------------------------------------------------------------------
//
btn_clear.addEventListener("click", clear_all, false);

function clear_all(){
  listContainer.innerHTML = "";
  AllChecks();
}


//
//Count the todos!
//

function countTodo(){
  const toTalTodo = listContainer.children.length;
  const checkedTodos = document.querySelectorAll(".checked").length;

  const todoCount = document.getElementById("todo-count");
  const doneCount = document.getElementById("done-count")

  todoCount.innerHTML = toTalTodo;
  doneCount.innerHTML = checkedTodos;
}

countTodo();


//
//Save and display data
//
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showSaved(){
  listContainer.innerHTML = localStorage.getItem("data");
  countTodo();
}

showSaved();


//
// Empty state----------------------------------------------------------------
//
const tooggleEmptyState = document.getElementById("empty-state");
const tooggleTodoList = document.getElementById("list-container");
const helpTodo = document.getElementById("todo-help");
const empty_state_img = document.getElementById("empty-state-img");

function empty_State_Check(){
  // empty_state = createEmpty();
  if (listContainer.children.length === 0){
    tooggleEmptyState.style.display = "inline-block";
    tooggleTodoList.style.display = "none";
  }
  else if (listContainer.children.length > 0){
    tooggleEmptyState.style.display = "none";
    tooggleTodoList.style.display = "flex";
  }

  randomChoice = Math.floor(Math.random() * 3);;
  randomChoice = 0;
  if (randomChoice === 0){
    helpTodo.innerHTML = "Nothing to do ? Hydrate yourself with 'Drink 1 cup of water'";
    empty_state_img.setAttribute("src", "images/pooh-eating-honey-live.gif");
    empty_state_img.setAttribute("id", "pooh-eating")
  }
  else if (randomChoice === 1){
    helpTodo.innerHTML = "Nothing to do ? Make sure to put 'Love yourself' as first!";
    empty_state_img.setAttribute("src", "images/pooh-walking-live.gif");
  }
  else if (randomChoice === 2){
    helpTodo.innerHTML = "People say nothing is impossible, but I 'do nothing' every day.";
    empty_state_img.setAttribute("src", "images/pooh-rest.gif");
  }
}


empty_State_Check()

function AllChecks(){
  countTodo();
  empty_State_Check();
  saveData();
}
