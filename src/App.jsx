import { useEffect, useState } from "react";
import ProgressTracker from "./Components/ProgressTracker";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (task, i) => {
    const newTasks = [...tasks];
    newTasks[i] = task;
    setTasks(newTasks);
  };
  const deleteTask = (i) => setTasks(tasks.filter((_, idx) => idx !== i));
  const clearTasks = () => setTasks([]);
  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <div className="App">
      <header>
        <h1 className="title">TaskBuddy</h1>
        <p className="tagline">Your friendly Task Manager</p>
        <button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </header>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <ProgressTracker tasks={tasks} />
      {tasks.length > 0 && <button className="clear-btn" onClick={clearTasks}>Clear All Tasks</button>}
    </div>
  );
}
