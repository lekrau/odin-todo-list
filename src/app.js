import { Project } from "./project.js";

export class App {
    _projects = [];

    constructor() {
        this._projects.push(new Project("Tasks"));
    }

    addProject(title, id) {
        const project = new Project(title, id);
        this._projects.push(project);
        return project;
    }

    deleteProject(id) {
        const index = this._projects.findIndex((project, index, projects) => {
            return project.id === id;
        });
        if (index === -1) {
            throw new Error(`Can't remove project "${id}", not found.`);
        } else if (index === 0) {
            throw new Error(`Can't remove default project "${id}".`);
        } else {
            const projectArray = this._projects.splice(index, 1);
            return projectArray[0];
        }
    }

    renameProject(id, title) {
        const index = this._projects.findIndex((project, index, projects) => {
            return project.id === id;
        });
        if (index === -1) {
            throw new Error(`Can't rename project "${id}", not found.`);
        } else if (index === 0) {
            throw new Error(`Can't rename default project "${id}".`);
        } else {
            this._projects[index].title = title;
        }
    }

    get projects() {
        return this._projects;
    }

    addTodo(title, projectId) {
        if (projectId === undefined) {
            // If project is not specify, chose default project (this._projects[0])
            return this._projects[0].addTodo(title);
        } else {
            const index = this._projects.findIndex((project, index, projects) => {
                return project.id === projectId;
            });
            if (index === -1) {
                throw new Error(`Can't add todo "${title}, project "${projectId}" not found.`);
            } else {
                return this._projects[index].addTodo(title);
            }
        }
    }

    removeTodo(id, projectId) {
        if (projectId === undefined) {
            // If project is not specified, chose default project (this._projects[0])
            return this._projects[0].removeTodo(id);
        } else {
            const index = this._projects.findIndex((project, index, projects) => {
                return project.id === projectId;
            });
            if (this._projects[index] === undefined) {
                throw new Error(`Can't remove todo "${id}", project "${projectId}" not found.`);
            } else {
                return this._projects[index].removeTodo(id);
            }
        }
    }

    updateTodo(todoId, projectId, field, value) {
        const project = this._projects.find((project, index, projects) => {
            return project.id === projectId;
        });
        if (project === undefined) {
            throw new Error(`Can't update attribute "${field}" of todo "${todoId}" to value "${value}". Project "${projectId}" is not found.`);
        } else {
            const todo = project.todos.find((todo, index, projects) => {
                return todo.id === todoId;
            });
            if (todo === undefined) {
                throw new Error(`Can't update attribute "${field}" to value "${value}" in project "${projectId}". Todo "${todoId}" is not found.`);
            } else {
                if (field === "title" || field === "description" || field === "dueDate") {
                    todo[field] = value;
                } else if (field === "priority") {
                    // Special case: Conversion to number
                    todo[field] = +value;
                } else {
                    throw new Error(`Unknown change "${value}" of attribute "${field}" from todo "${todoId}" in project "${projectId}".`);
                }
            }
        }
    }
};