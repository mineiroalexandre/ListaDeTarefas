'use strict';
// Icons for remove and complete buttons 
const removeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

/*
* Inicialize arrays containing ToDo Itens.
* If localSorage already contained stored itens, the arrays are initializes
* to the storedvalue. Otherxise, they are initialized to be empty arrays.
*/
let todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
let completed = (localStorage.getItem('completed') ?  JSON.parse(localStorage.getItem('completed')) : []);

loadItens(); 

//When 'add' button is clicked, it should add to the list an item with the text inside the input field.	
document.getElementById('add').onclick = function() {

	let itemText = document.getElementById('item-text').value;
	if(itemText) {
		addIteemToDOM(itemText);
		document.getElementById('item-text').value = '';
		todos.push(itemText);

		updateStorage();
	}
}

document.getElementById('item-text').addEventListener('keydown', function(e) {
	let itemText = this.value;
	if (e.code === 'Enter' && itemText) {
		addIteemToDOM(itemText);
		document.getElementById('item-text').value = '';
		todos.push(itemText);

		updateStorage();
	}
},false);

function addIteemToDOM(itemText, completed) {
	let item = document.createElement('li');
	item.innerText = itemText;

	let buttons = document.createElement('div');
	buttons.classList.add('buttons');

	let removeButton = document.createElement('button');
	removeButton.classList.add('remove');
	removeButton.innerHTML = removeIcon;
	removeButton.onclick = removeItem;

	removeButton.addEventListener('onclick', removeItem);

	let completeButton = document.createElement('button');
	completeButton.classList.add('complete');
	completeButton.innerHTML = completeIcon;
	completeButton.onclick = completeItem;

	completeButton.addEventListener('onclick', completeItem);

	buttons.append(removeButton);
	buttons.append(completeButton);
	item.append(buttons);

	//Define the list in which the item should go if it is true or false
	let listId = (completed ? 'completed-list' : 'todo-list');

	document.getElementById(listId).prepend(item);
}

//load the todo list with the elements inside the arrays.
function loadItens() {
	for(let i = 0; i < todos.length; i = i + 1) {
		addIteemToDOM(todos[i]);
	}

	for(let i = 0; i < completed.length; i = i + 1) {
		addIteemToDOM(completed[i], true);
	}
}

//Removes the item when the remove button calls the function
function removeItem() {
	let item = this.parentNode.parentNode;
	let text = item.innerText;
	let currentListId = item.parentNode.id;
	
	item.remove();

	if(currentListId === 'todo') {
		todos.splice(todos.indexOf(text), 1);
	} else {
		completed.splice(completed.indexOf(text), 1);
	}
	updateStorage();
}

/*
* Changes the status of the item when the button is full and clicked.
* When the item is marked as complete, it changes to the complete list.
* I also feel marked as unconfused, it does the opposite.
*/
function completeItem() {
	let item = this.parentNode.parentNode;
	let currentList = item.parentNode;

	let currentListId = item.parentNode.id;
	let text = item.innerText;
	
	item.remove();

	if (currentListId === 'todo-list') {
		todos.splice(todos.indexOf(text), 1);
		completed.push(text);
		document.getElementById('completed-list').prepend(item);
	} else {
		completed.splice(completed.indexOf(text), 1);
		todos.push(text);
		document.getElementById('todo-list').prepend(item);
	}
	updateStorage();
}

//Function that updates both the complete items and the items to be done in LocalStorage
function updateStorage() {
	localStorage.setItem('todos', JSON.stringify(todos));
	localStorage.setItem('completed', JSON.stringify(completed));
}
