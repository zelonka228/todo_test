import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const todoAdd = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, done: false }]);
      setInput("");
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {tasks.map((task, i) => (
          <li key={i} className="todo-item">
            <div className="todo-left">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  const updated = [...tasks];
                  updated[i].done = !updated[i].done;
                  setTasks(updated);
                }}
              />
              <span className={task.done ? "done" : ""}>{task.text}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => setTasks(tasks.filter((_, j) => j !== i))}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <div className="todo-input-block">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            todoAdd();
          }}
        >
          <input
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="todo-add-btn" type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}
