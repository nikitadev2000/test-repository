import { useState } from "react";
import "./App.css";

interface Todo {
	text: string;
	id: number;
	completed: boolean;
}

function App() {
	const [text, setText] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = () => {
		if (text.trim().length !== 0) {
			setTodos([...todos, { text: text, id: +new Date(), completed: false }]);
		}
		setText("");
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleTodoCompletion = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	return (
		<div className="app">
			<h1>Todo List</h1>
			<div className="todo-input">
				<input
					value={text}
					type="text"
					onChange={(e) => setText(e.target.value)}
					placeholder="Enter a new todo"
				/>
				<button onClick={addTodo}>Add</button>
			</div>
			<div className="todo-list">
				{todos.map((todo) => (
					<div key={todo.id} className="todo-item">
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodoCompletion(todo.id)}
						/>
						<span className={todo.completed ? "completed" : ""}>
							{todo.text}
						</span>
						<button onClick={() => deleteTodo(todo.id)}>Remove</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
