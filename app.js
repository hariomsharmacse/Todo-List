const btnTodo = document.getElementById("btn");
const inputValue = document.getElementById("input");
const items = document.getElementById("items");
const list = document.querySelectorAll("li");
const mainBlock = document.querySelector(".main");

const child = document.createElement("li");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("Fruits"));
};

const addTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem("Fruits", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElemnt = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("items");
  divElement.innerHTML = `<li>${curElem}</li><button class="delete">Delete</button>`;
  mainBlock.append(divElement);
};

btnTodo.addEventListener("click", () => {
  const todoListValue = inputValue.value.trim();

  inputValue.value = "";
  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    localStorage.setItem("Fruits", JSON.stringify(localTodoLists));
    addTodoDynamicElemnt(todoListValue);
  }
});

const showTodoList = () => {
  console.log(localTodoLists);
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElemnt(curElem);
  });
};

showTodoList();

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem = todoToRemove.parentElement;

  console.log(todoListContent);

  localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorage(localTodoLists);
  parentElem.remove();
  console.log(localTodoLists);
};

mainBlock.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    removeTodoElem(e);
  }
});
