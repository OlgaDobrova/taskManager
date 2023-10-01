"use strict";
//Это Урок №13 основное задание
//to do - делать

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");

const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

//массив объектов todo-шек
let toDoData = [];

//ф-ция render - отрисовка todo-шек - добавление верстки
const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item, index) {
    //отрисовываем верстку
    const li = document.createElement("li");

    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(index, 1);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });
  });
};

if (localStorage.getItem("toDoData") !== null) {
  toDoData = JSON.parse(localStorage.getItem("toDoData"));
  render();
}

//срабатывает при отправке ФОС!
// submit - метод отправки ФОС через Get-запрос - это спровоцирует перезагрузку страницы
todoControl.addEventListener("submit", function (event) {
  event.preventDefault(); //отмена стандартного поведения

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (newToDo.text.trim() != "") {
    toDoData.push(newToDo);
  }
  headerInput.value = "";

  localStorage.setItem("toDoData", JSON.stringify(toDoData));

  render();
});
