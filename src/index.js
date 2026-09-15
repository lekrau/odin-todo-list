import "./styles.css";
import { App } from "./app.js";
import { Logger } from "./logging.js";
import { DisplayController } from "./display-controller.js";

const app = new App();
const logger = new Logger();
const storage = {};
storage.task = {};
storage.task.title = app.projects[0].title;
storage.task.id = app.projects[0].id;
storage.task.todos = [];

console.log("Test - Adding Todos to default project");
storage.task.todos.push(app.addTodo("Oma anrufen"));
// WEITER: Restliche Referenzen aus Tests in storage speichern
// Dann Methoden mit findIndex von title auf id umstellen
storage.task.todos.push(app.addTodo("Aufgaben sortieren"));
storage.task.todos.push(app.addTodo("Faulenzen"));

console.log("Test - Removing Todos from default project");
app.removeTodo(storage.task.todos[2].id);
// app.removeTodo("App programmieren"); // Error

console.log("Test - Adding Projects");
app.addProject("Haushalt");
storage.haushalt = {};
storage.haushalt.title = app.projects[1].title;
storage.haushalt.id = app.projects[1].id;
storage.haushalt.todos = [];
app.addProject("Programmierung");
storage.programmierung = {};
storage.programmierung.title = app.projects[2].title;
storage.programmierung.id = app.projects[2].id;
storage.programmierung.todos = [];
app.addProject("Sonstiges");
storage.sonstiges = {};
storage.sonstiges.title = app.projects[3].title;
storage.sonstiges.id = app.projects[3].id;
storage.sonstiges.todos = [];
console.log("Test - Deleting projects");
app.deleteProject(storage.sonstiges.id);

console.log("Test - Adding Todos to specific Projects");
storage.programmierung.todos.push(app.addTodo("App programmieren", storage.programmierung.id));
storage.programmierung.todos.push(app.addTodo("Rechnung schreiben", storage.programmierung.id));
storage.haushalt.todos.push(app.addTodo("Müll raus bringen", storage.haushalt.id));
// app.addTodo("Aufräumen", "Sonstiges"); // Error
storage.haushalt.todos.push(app.addTodo("Aufräumen", storage.haushalt.id));

console.log("Test - Removing Todos from specific Projects");
app.removeTodo(storage.haushalt.todos[1].id, storage.haushalt.id);
// app.removeTodo("Aufräumen", "Haushalt"); // Error
// app.removeTodo("App Programmieren", "Programmieren"); // Error

console.log("Test - Removing Todos/Projects with duplicate titles");
storage.task.todos.push(app.addTodo("Oma anrufen"));
app.removeTodo(storage.task.todos[0].id);
storage.programmierung.todos.push(app.addTodo("App programmieren", storage.programmierung.id));
app.removeTodo(storage.programmierung.todos[0].id, storage.programmierung.id);
app.addProject("Haushalt");
storage.haushalt2 = {};
storage.haushalt2.title = app.projects[3].title;
storage.haushalt2.id = app.projects[3].id;
storage.haushalt2.todos = [];
app.deleteProject(storage.haushalt.id);

logger.logStatus(app.projects);
console.table(storage);

const displayController = new DisplayController;
displayController.renderSidebar(app.projects);