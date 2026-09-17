export class DisplayController {
    body = document.querySelector("body");
    projectList = this.body.querySelector(".project-list");
    listTodos = this.body.querySelector(".list__todos");
    listHeading = this.body.querySelector(".list__heading");
    todoDetails = this.body.querySelector(".todo__details");
    todoTitle = this.todoDetails.querySelector(".todo__title");
    todoDescription = this.todoDetails.querySelector(".todo__description");
    todoDueDate = this.todoDetails.querySelector(".todo__due-date");
    todoPriority = this.todoDetails.querySelector(".todo__priority");

    constructor(projects) {
        this.projects = projects;
    }

    renderSidebar() {
        this.projects.forEach(project => {
            const li = document.createElement("li");
            const button = document.createElement("button");

            button.textContent = project.title;
            button.classList.add("project");
            button.addEventListener("click", this.handleProjectClick.bind(this));
            button.dataset.projectId = project.id;

            this.projectList.appendChild(li);
            li.appendChild(button);
        });
    }

    handleProjectClick(event) {
        const projectId = event.target.dataset.projectId;
        const project = this.projects.find((project, index, projects) => {
            return project.id === projectId;
        });
        this.renderList(project);
    }

    renderList(project) {
        this.listHeading.textContent = project.title;
        this.listTodos.innerHTML = "";
        this.todoDetails.hidden = true;
        this.todoDetails.ariaHidden = true;
        project.todos.forEach(todo => {
            const li = document.createElement("li");
            const button = document.createElement("button");

            button.textContent = todo.title;
            button.classList.add("todo");
            button.addEventListener("click", this.handleTodoClick.bind(this));
            button.dataset.todoId = todo.id;
            button.dataset.projectId = project.id;

            this.listTodos.appendChild(li);
            li.appendChild(button);
        });
    }

    handleTodoClick(event) {
        const todoId = event.target.dataset.todoId;
        const projectId = event.target.dataset.projectId;
        const project = this.projects.find((project, index, projects) => {
            return project.id === projectId;
        });
        const todo = project.todos.find((todo, index, projects) => {
            return todo.id === todoId;
        });
        this.renderTodoDetails(todo);
    }

    renderTodoDetails(todo) {
        this.todoDetails.hidden = false;
        this.todoDetails.ariaHidden = false;
        this.todoTitle.textContent = todo.title;
        this.todoDescription.textContent = todo.description;
        this.todoDueDate.textContent = todo.dueDate;
        this.todoPriority.textContent = todo.priority;
    }
};

// TODOs
// Scope creep vermeiden!!!
// Assignment 5
// - Expand a single todo to see/edit its details -> handleTodoClick implementieren
//  * Due date, description etc. anzeigen ✅
//  * Styling: Als Leiste rechts öffnen
//  * Edit details
// - show duedate in todo overview
// - change color in todo overview for different priorities
// - Delete a todo.

// Ideen - erst Lernwert kurz mit ChatGPT reflektieren
// - "Done" marker ergänzen
// - Projektunabhängige Listen (All, Planned, Today, Done)