import { Logger } from "./logging.js";


export const runConsoleTests = (app, logStatus = false, logStorage = false) => {
    const storage = {};
    storage.task = {};
    storage.task.title = app.projects[0].title;
    storage.task.id = app.projects[0].id;
    storage.task.todos = [];

    console.log("Test - Adding Todos to default project");
    storage.task.todos.push(app.addTodo("Oma anrufen"));
    storage.task.todos.push(app.addTodo("Aufgaben sortieren"));
    app.projects[0].todos[1].description = "Korrektem Projekt zuordnen";
    app.projects[0].todos[1].priority = 2;
    app.projects[0].todos[1].dueDate = "17.09.2026";
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
    app.projects[2].todos[1].description = "An Musterkunden";
    app.projects[2].todos[1].priority = 3;
    app.projects[2].todos[1].dueDate = "22.09.2026";
    storage.haushalt.todos.push(app.addTodo("Müll raus bringen", storage.haushalt.id));
    // app.addTodo("Aufräumen", "Sonstiges"); // Error
    storage.haushalt.todos.push(app.addTodo("Aufräumen", storage.haushalt.id));

    console.log("Test - Removing Todos from specific Projects");
    app.removeTodo(storage.haushalt.todos[1].id, storage.haushalt.id);
    // app.removeTodo("Aufräumen", "Haushalt"); // Error
    // app.removeTodo("App Programmieren", "Programmieren"); // Error

    console.log("Test - Removing Todos/Projects with duplicate titles");
    storage.task.todos.push(app.addTodo("Oma anrufen"));
    app.projects[0].todos[2].description = "+49 123 456789";
    app.projects[0].todos[2].priority = 1;
    app.projects[0].todos[2].dueDate = "20.09.2026"
    app.removeTodo(storage.task.todos[0].id);
    storage.programmierung.todos.push(app.addTodo("App programmieren", storage.programmierung.id));
    app.projects[2].todos[2].description = "Odin Todo App";
    app.projects[2].todos[2].priority = 2;
    app.projects[2].todos[2].dueDate = "18.09.2026";
    app.removeTodo(storage.programmierung.todos[0].id, storage.programmierung.id);
    app.addProject("Haushalt");
    storage.haushalt2 = {};
    storage.haushalt2.title = app.projects[3].title;
    storage.haushalt2.id = app.projects[3].id;
    storage.haushalt2.todos = [];
    app.deleteProject(storage.haushalt.id);

    console.log("Test - Add Todo with undefined dueDate");
    storage.task.todos.push(app.addTodo("Mama anrufen"));
    app.projects[0].todos[2].description = "+49 987 654321";
    app.projects[0].todos[2].priority = 1;

    console.log("Test - Add Todo to fill the screen");
    storage.task.todos.push(app.addTodo("1"));
    storage.task.todos.push(app.addTodo("2"));
    storage.task.todos.push(app.addTodo("3"));
    storage.task.todos.push(app.addTodo("4"));
    storage.task.todos.push(app.addTodo("5"));
    storage.task.todos.push(app.addTodo("6"));
    storage.task.todos.push(app.addTodo("7"));    
    storage.task.todos.push(app.addTodo("8"));    

    if (logStatus === true) {
        const logger = new Logger();
        logger.logStatus(app.projects);
    }
    if (logStorage === true) {
        console.table(storage);
    }
}