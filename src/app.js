import { Project } from "./project.js";

export class App {
    _projects = [];

    constructor() {
        this._projects.push(new Project("Tasks"));
    }

    addProject(title) {
        const project = new Project(title)
        this._projects.push(project);
        return project;
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
    };
};