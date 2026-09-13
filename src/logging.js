export class Logger {
    constructor() {
    }

    logStatus(projects) {
        console.log("PROJECTS");
        projects.forEach(project => {
            console.log(project.title);
            project.todos.forEach(todo => {
                console.log(`- ${todo.title} (${todo.dueDate})`);
            });
        })
    }
};