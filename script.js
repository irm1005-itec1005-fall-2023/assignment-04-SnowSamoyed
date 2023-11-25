/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

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
// Inits & Event Listeners
//
// inititialise();

function add_todo(){
  if(inputBox.value === ""){
    alert("You must write something");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", removeTodo, false);

function removeTodo(event){
  if (event.target.tagName === "LI"){
    event.target.classList.toggle("checked");
    saveData();
  }
  // link this with the closing animation????
  else if (event.target.tagName === "SPAN"){
    event.target.parentElement.remove();
    saveData();
  }
}

// Todo Manager area -----------------------------------------------------------
// Display number of todos (inside HTMLCollection the length is 2 but can't print out ????)
const Count = document.getElementById("list-container").getElementsByTagName("li").length; //Not working
const todoCount = document.getElementById("todo-count");

console.log(Count);
todoCount.innerHTML = Count;



// Add clear everything
btn_clear.addEventListener("click", clear_all, false);
function clear_all(){
  listContainer.innerHTML = "";
  saveData();
}


function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showSaved(){
  listContainer.innerHTML = localStorage.getItem("data");
}

showSaved();