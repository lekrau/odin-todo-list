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
    handleTodoDetailsChangeFunctionReference = this.handleTodoDetailsChange.bind(this);

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
        this.todoDetails.classList.add("inactive");
        this.todoDetails.ariaHidden = true;
        this.renderList(project);
    }

    renderList(project) {
        this.listHeading.textContent = project.title;
        this.listTodos.innerHTML = "";
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
        this.renderTodoDetails(todo, projectId);
    }

    renderTodoDetails(todo, projectId) {
        this.todoDetails.classList.remove("inactive");
        this.todoDetails.ariaHidden = false;

        this.todoDetails.dataset.todoId = todo.id;
        this.todoDetails.dataset.projectId = projectId;
        this.todoTitle.value = todo.title;
        this.todoDescription.value = todo.description;
        this.todoDueDate.value = todo.dueDate;
        this.todoPriority.value = todo.priority;

        // REFACTOR? Add eventListener to shared parent? Or specific eventListeners (see editAttribute())?
        this.todoTitle.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoDescription.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoDueDate.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoPriority.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
    }

    handleTodoDetailsChange(event) {
        const target = event.target;
        const value = target.value;
        let parent = target.parentElement;
        if (parent.nodeName.toLowerCase() === "h3") {
            parent = parent.parentElement;
        }
        const todoId = parent.dataset.todoId;
        const projectId = parent.dataset.projectId;

        // TODO: Repeated code -> function?
        const project = this.projects.find((project, index, projects) => {
            return project.id === projectId;
        });
        const todo = project.todos.find((todo, index, projects) => {
            return todo.id === todoId;
        });

        // TODO: Refactor to use data attribute?
        const targetClass = target.classList[0];
        if (targetClass === "todo__title") {
            todo.title = value;
        } else if (targetClass === "todo__description") {
            todo.description = value;
        } else if (targetClass === "todo__due-date") {
            // TODO: Proper treatment as a date
            todo.dueDate = value;
        } else if (targetClass === "todo__priority") {
            todo.priority = +value;
        } else {
            throw new Error(`Unknown change of attribute "${targetClass}" of todo "${todoId}" in project "${projectId}".`);
        }

        this.renderList(project);
    }

    editAttribute(attribute, value) {
        // REFACTOR? Make handleTodoDetailsChange shorter
    }
};

// TODOs
// Scope creep vermeiden!!!
// Assignment 5
// - Expand a single todo to see/edit its details -> handleTodoClick implementieren
//  * Due date, description etc. anzeigen ✅
//  * Styling: Als Leiste rechts öffnen ✅
//  * Edit details ✅
// - show duedate in todo overview
// - change color in todo overview for different priorities
// - Delete a todo.
// Add a todo - WEITER !!!

// Ideen - erst Lernwert kurz mit ChatGPT reflektieren
// - "Done" marker ergänzen
// - Projektunabhängige Listen (All, Planned, Today, Done)