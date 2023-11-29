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

// 1. Enter to add

// Constants
const appID = "app";
const headingText = "To do. To done. ✅";

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let innerTodoList = [];
let Count = innerTodoList.length;


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

//https://stackoverflow.com/questions/9643311/pass-a-string-parameter-in-an-onclick-function
let add_button = document.getElementById("add-button");
add_button.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    add_todo();
  }
});

function add_todo(){
  if(inputBox.value === ""){
    alert("You must write something");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.setAttribute("id", "todo-box")
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    tempTodoValue = inputBox.value;
    innerTodoList.push(tempTodoValue);
    console.log(innerTodoList);

    countTodo()
  }
  
  inputBox.value = "";
  empty_State_Check();
  saveData();
}

function countTodo(){
    // console.log(innerTodoList.length)
    Count = innerTodoList.length;
    let todoCount = document.getElementById("todo-count");
    todoCount.innerHTML = "0";

    if (Count > 0){
      todoCount.innerHTML = Count;
    }
    else {
      todoCount.innerHTML = "0";
    }
}

listContainer.addEventListener("click", removeTodo, false);

function removeTodo(event){
  if (event.target.tagName === "LI"){
    event.target.classList.toggle("checked");
    saveData();
  }
  // link this with the closing animation????
  else if (event.target.tagName === "SPAN"){
    event.target.parentElement.setAttribute("id", "removing")
    event.target.parentElement.remove();

    tempTodoValue = inputBox.value;
    innerTodoList.pop(tempTodoValue);
    console.log(innerTodoList);

    countTodo()
    empty_State_Check();
    saveData();
  }
}



// Add clear everything
btn_clear.addEventListener("click", clear_all, false);
function clear_all(){
  innerTodoList = []
  listContainer.innerHTML = "";

  countTodo();
  console.log(innerTodoList.length, "Empty state check")
  empty_State_Check(); // does not work!
  saveData();
}


function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showSaved(){
  listContainer.innerHTML = localStorage.getItem("data");
}

showSaved();

//Empty state, also not working???----------------------------------------------------------------
console.log(Count);

let empty_state = document.createElement("li");
empty_state.innerHTML = "Nothing to do? \n Try to hydrate yourself with 'Drink 1 cup of water.'";
listContainer.appendChild(empty_state);
empty_state.setAttribute("id", "empty-state");

let empty_state_img = document.createElement("span");
empty_state_img.src = "/images/pooh-thinking.png";
empty_state.appendChild(empty_state_img);
console.log(empty_state_img);

function empty_State_Check(){
  if (innerTodoList.length === 0){
    empty_state.style.display = "inline-block";
  }
  else if (innerTodoList.length > 0){
    empty_state.style.display = "none";
  }
}
