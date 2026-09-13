import { Project } from "./project.js";

export class App {
    _projects = [];

    constructor() {
        this._projects.push(new Project("Tasks"));
    }

    addProject(title) {
        this._projects.push(new Project(title));
    }

    addTodo(title, projectTitle) {
        // TODO: Enhance to chose specific project
        if (projectTitle === undefined) {
            // If project is not specify, chose default project (this._projects[0])
            this._projects[0].addTodo(title);
        } else {
            // console.log("title", title);
            // console.log("projectTitle", projectTitle);
            const index = this._projects.findIndex((project, index, projects) => {
                return project.title === projectTitle;
            });
            if (index === -1) {
                throw new Error(`Can't add todo "${title}, project "${projectTitle}" not found.`);
            } else {
                this._projects[index].addTodo(title);
            }
            // console.log("index", index);
            // console.log("this._projects[index]", this._projects[index]);
        }
    }

    removeTodo(title, projectTitle) {
        // Will cause problems for duplicate titles -> use id to identify Todo
        if (projectTitle === undefined) {
            // If project is not specify, chose default project (this._projects[0])
            this._projects[0].removeTodo(title);
        } else {
            const index = this._projects.findIndex((project, index, projects) => {
                return project.title === projectTitle;
            });
            if (this._projects[index] === undefined) {
                throw new Error(`Can't remove todo "${title}", project "${projectTitle}" not found.`);
            } else {
                this._projects[index].removeTodo(title);
            }
        }
    }

    deleteProject(title) {
        // Will cause problems for duplicate titles -> use id to identify Project
        const index = this._projects.findIndex((project, index, projects) => {
            return project.title === title;
        });
        // console.log(index);
        // console.log(this._projects[index]);

        if (index === -1) {
            throw new Error(`Can't remove project "${title}", not found.`);
        } else if (index === 0) {
            throw new Error(`Can't remove default project "${title}".`);
        } else {
            this._projects.splice(index, 1);
        }
    }

    get projects() {
        return this._projects;
    };

    set projects(value) {
        this._projects = value;
    };
};