const apiUrl = 'https://jsonplaceholder.typicode.com/todos'
const todoForm = document.getElementById('todo-form')
const todoLists = document.getElementById('todo-lists')

const fetchTodos = () => {
	fetch(apiUrl + '?_limit=5')
		.then((res) => res.json())
		.then((data) => {
			data.forEach((todo) => addTodoToDOM(todo))
		})
}

const addTodoToDOM = (todo) => {
	const ul = document.getElementById('todo-lists')
	const li = document.createElement('li')
	li.setAttribute('data-id', todo.id)
	li.classList.add(
		'text-xl',
		'shadow-lg',
		'py-2',
		'px-4',
		'rounded-sm',
		'bg-green-100',
		'todo'
	)
	if (todo.completed) {
		li.classList.add('bg-slate-400')
	}
	li.appendChild(document.createTextNode(todo.title))
	ul.appendChild(li)
}

const createTodo = (e) => {
	e.preventDefault()
	const newTodo = {
		title: e.target.firstElementChild.value,
		completed: false,
	}

	fetch(apiUrl, {
		method: 'POST',
		body: JSON.stringify(newTodo),
		headers: {
			'Content-type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => addTodoToDOM(data))

	e.target.firstElementChild.value = ''
}

const todoCompleteToggle = (e) => {
	if (e.target.classList.contains('todo')) {
		e.target.classList.toggle('bg-slate-400')
	}

	fetch(`${apiUrl}/${e.target.dataset.id}`, {
		method: 'PUT',
		body: JSON.stringify({
			completed: e.target.classList.contains('bg-slate-400'),
		}),
		headers: {
			'Content-type': 'application/json',
		},
	})
}

const deleteTodo = (e) => {
	fetch(`${apiUrl}/${e.target.dataset.id}`, {
		method: 'DELETE',
	})
		.then((res) => res.json())
		.then(() => e.target.remove())
}
//Event Listeners
document.addEventListener('DOMContentLoaded', fetchTodos)
todoForm.addEventListener('submit', createTodo)
todoLists.addEventListener('click', todoCompleteToggle)
todoLists.addEventListener('dblclick', deleteTodo)
