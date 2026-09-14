import "./styles.css";
import { App } from "./app.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { Logger } from "./logging.js";

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

console.log("Test - Adding projects");
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

console.log("Test - Adding Todos to specific projects");
storage.programmierung.todos.push(app.addTodo("App programmieren", "Programmierung"));
storage.programmierung.todos.push(app.addTodo("Rechnung schreiben", "Programmierung"));
storage.haushalt.todos.push(app.addTodo("Müll raus bringen", "Haushalt"));
// app.addTodo("Aufräumen", "Sonstiges"); // Error
storage.haushalt.todos.push(app.addTodo("Aufräumen", "Haushalt"));

console.log("Test - Removing Todos from specific projects");
app.removeTodo(storage.haushalt.todos[1].id, storage.haushalt.id);
// app.removeTodo("Aufräumen", "Haushalt"); // Error
// app.removeTodo("App Programmieren", "Programmieren"); // Error

logger.logStatus(app.projects);
console.table(storage);

// Ziele
// 1. Todo zu einem bestimmten Project hinzufügen und daraus wieder entfernen können. ✅
// 2. Dabei sinnvolles Verhalten für „Project nicht gefunden“ sicherstellen. ✅
// 3. Deine bisherigen Test-Projects und -Todos so erfassen, dass du ihre erzeugten IDs sinnvoll weiterverwenden kannst. ✅
// 4. Die bisher titelbasierte Identifikation bei den relevanten Operationen auf IDs umstellen. ✅
// 5. Explizit testen, dass gleichnamige Todos und Projects kein Identifikationsproblem mehr verursachen.
// 6. Die bisherigen Kernabläufe einmal vollständig durchlaufen lassen: Default Project, mehrere Projects, mehrere Todos, Hinzufügen und Entfernen.
// 7. Testcode/Kommentare soweit aufräumen, dass der Stand verständlich ist, und committen.
// 6. Bonusziel: Prüfe noch kurz, ob sich ein bestehendes Todo über deine Application Logic sinnvoll ändern lässt (title, description, dueDate, priority).