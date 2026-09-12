import "./styles.css";
import { App } from "./app.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { Logger } from "./logging.js";

const app = new App();
const logger = new Logger();

// Test adding and removing Todos from default project
app.addTodo("App programmieren");
app.addTodo("Müll raus bringen");
app.addTodo("Oma anrufen");
app.addTodo("Müll raus bringen");
app.removeTodo("App programmieren");
// app.removeTodo("App programmieren"); // Error

// Test adding and removing projects
app.addProject("Haushalt");
app.addProject("Programmierung");
// logger.logStatus(app.projects);
app.deleteProject("Haushalt");

// Test adding and removing Todos from specific projects
app.addTodo("App programmieren", "Programmierung");
// WEITER !!!
// Ggf. umbauen auf id als identifier -> ChatGPT konsultieren für praktikabilität?


logger.logStatus(app.projects);

// todo.description = "Beschreibung"
// console.log("test.description", test.description);
