import "./styles.css";
import { App } from "./app.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { Logger } from "./logging.js";

const app = new App();
const logger = new Logger();

console.log("Test - Adding Todos from default project");
app.addTodo("Oma anrufen");
app.addTodo("Aufgaben sortieren");
app.addTodo("Faulenzen");

console.log("Test - Removing Todos from default project");
app.removeTodo("Faulenzen");
// app.removeTodo("App programmieren"); // Error

console.log("Test - Adding projects");
app.addProject("Haushalt");
app.addProject("Programmierung");
app.addProject("Sonstiges");
console.log("Test - Deleting projects");
app.deleteProject("Sonstiges");

console.log("Test - Adding Todos to specific projects");
app.addTodo("App programmieren", "Programmierung");
app.addTodo("Rechnung schreiben", "Programmierung");
app.addTodo("Müll raus bringen", "Haushalt");
app.addTodo("Aufräumen", "Sonstiges");
app.addTodo("Aufräumen", "Haushalt");

console.log("Test - Removing Todos from specific projects");
app.removeTodo("Aufräumen", "Haushalt");
app.removeTodo("Aufräumen", "Haushalt");
// app.removeTodo("App Programmieren", "Programmieren"); // Error
// WEITER !!!
// Ggf. umbauen auf id als identifier -> ChatGPT konsultieren für praktikabilität?

logger.logStatus(app.projects);

// Ziele
// 1. Todo zu einem bestimmten Project hinzufügen und daraus wieder entfernen können. ✅
// 2. Dabei sinnvolles Verhalten für „Project nicht gefunden“ sicherstellen. ✅
// 3. Deine bereits erkannte Duplicate-Title-/ID-Frage so weit lösen, wie sie für diese Operationen tatsächlich nötig wird.
// 4. Die wichtigsten Abläufe einmal über index.js testen: Default Project, mehrere Projects, mehrere Todos, hinzufügen/löschen.
// 5. Wenn dieser Stand funktioniert: aufräumen und committen.
// 6. Bonusziel: Prüfen, ob du ein bestehendes Todo über deine Application Logic sinnvoll verändern kannst, etwa description, dueDate oder priority.