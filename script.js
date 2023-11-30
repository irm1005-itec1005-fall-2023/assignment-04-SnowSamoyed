/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// What to add and fix
//  1. Responsive
// 
//  2. completed with data-
//✅3.Task count
//   4. empty state
//      Image not displaying
//      When ClearAll does not work
//✅5. branding
//      5.1 Pooh favicon
//✅6. Copyrights
//   7.Scroll bar

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
    listContainer.appendChild(li);
    let this_button = document.createElement("button");
    this_button.innerHTML = "\u00d7";
    li.appendChild(this_button);

    countTodo()
  }
  
  inputBox.value = "";
  empty_State_Check();
  saveData();
}

function countTodo(){
    const toTalTodo = listContainer.children.length;
    const checkedTodos = document.querySelectorAll(".checked").length;
    let todoCount = document.getElementById("todo-count");
    todoCount.innerHTML = toTalTodo;
}

countTodo();

//Adding removing function
listContainer.addEventListener("click", removeTodo, false);

function removeTodo(event){
  if (event.target.tagName === "LI"){
    event.target.classList.toggle("checked");
    saveData();
  }
  // link this with the closing animation????
  else if (event.target.tagName === "BUTTON"){
    let exitingItems = event.target.parentElement;
    // exitingItems.style.animation = "transitionOut";
    event.target.parentElement.setAttribute("id", "removing")
    event.target.parentElement.remove();

    countTodo()
    empty_State_Check();
    saveData();
  }
}



// Add clear everything
btn_clear.addEventListener("click", clear_all, false);
function clear_all(){
  listContainer.innerHTML = "";

  countTodo();
  empty_State_Check(); // does not work!
  saveData();
}


function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showSaved(){
  listContainer.innerHTML = localStorage.getItem("data");
  countTodo();
}

showSaved();

//Empty state, also not working???----------------------------------------------------------------
const insideApp = document.getElementById("main");

// let empty_state = document.createElement("span");
// empty_state.innerHTML = "Nothing to do? \n Try to hydrate yourself with 'Drink 1 cup of water.'";
// empty_state.setAttribute("id", "empty-state");
// insideApp.insertBefore(empty_state, insideApp.childNodes[4]);

// let empty_state_img = document.createElement("img");
// empty_state_img.src = "/images/pooh-thinking.png";
// empty_state.appendChild(empty_state_img);
// console.log(empty_state_img);

const tooggleEmptyState = document.getElementById("empty-state");
const tooggleTodoList = document.getElementById("list-container");

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
}

empty_State_Check()