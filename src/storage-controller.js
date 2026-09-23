export class StorageController {
    constructor(type = "localStorage") {
        this.type = type;
        this.storage = window[this.type];
    }

    storeProjects(projects) {
        this.storage.setItem("projects", JSON.stringify(projects));
        // this.storage.setItem(project.id, JSON.stringify(project));
    }

    loadStorage(app) {
        const projects = JSON.parse(this.storage.getItem("projects"));

        if (projects !== null) {
            const defaultProject = projects[0];
            const otherProjects = [];
            for (let index = 1; index < projects.length; index++) {
                otherProjects.push(projects[index]);
            }

            defaultProject._todos.forEach(todo => {
                app.addTodo(todo._title);
                const todoIndex = app.projects[0].todos.length - 1;
                app.projects[0].todos[todoIndex].description = todo._description;
                app.projects[0].todos[todoIndex].dueDate = todo._dueDate;
                app.projects[0].todos[todoIndex].priority = todo._priority;
            });

            otherProjects.forEach(project => {
                app.addProject(project._title);
                const projectIndex = app.projects.length - 1;
                const projectId = app.projects[projectIndex].id;
                project._todos.forEach(todo => {
                    app.addTodo(todo._title, projectId);
                    const todoIndex = app.projects[projectIndex].todos.length - 1;
                    app.projects[projectIndex].todos[todoIndex].description = todo._description;
                    app.projects[projectIndex].todos[todoIndex].dueDate = todo._dueDate;
                    app.projects[projectIndex].todos[todoIndex].priority = todo._priority;
                });
            });
            return true;
        } else {
            return false;
        }
    }


    storageAvailable() {
        // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
        try {
            const x = "__storage_test__";
            this.storage.setItem(x, x);
            this.storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                this.storage &&
                this.storage.length !== 0
            );
        }
    }
};
