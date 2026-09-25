import { format } from "date-fns";

export class DisplayController {
    body = document.querySelector("body");
    deleteProjectButton = this.body.querySelector(".delete-project");
    projectList = this.body.querySelector(".project-list");
    addProjectButton = this.body.querySelector(".add-project");
    listTodos = this.body.querySelector(".list__todos");
    listHeadingInput = this.body.querySelector(".list__heading input");
    todoDetails = this.body.querySelector(".todo__details");
    todoTitle = this.todoDetails.querySelector(".todo__title");
    todoDescription = this.todoDetails.querySelector(".todo__description");
    todoDueDate = this.todoDetails.querySelector(".todo__due-date");
    todoPriority = this.todoDetails.querySelector(".todo__priority");
    addTodoInput = this.body.querySelector(".add-todo");
    deleteTodoButton = this.body.querySelector(".delete-todo");
    handleDeleteProjectButtonClickFunctionReference = this.handleDeleteProjectButtonClick.bind(this);
    handleAddProjectButtonClickFunctionReference = this.handleAddProjectButtonClick.bind(this);
    handleListHeadingInputFunctionReference = this.handleListHeadingInputChange.bind(this);
    handleTodoDetailsChangeFunctionReference = this.handleTodoDetailsChange.bind(this);
    handleAddTodoInputKeydownFunctionReference = this.handleAddTodoInputKeydown.bind(this);
    handleDeleteTodoButtonClickFunctionReference = this.handleDeleteTodoButtonClick.bind(this);
    activeList;

    constructor(app, storageController) {
        this.app = app;
        this.projects = app.projects;
        this.storageController = storageController;
    }

    renderSidebar() {
        this.projectList.innerHTML = "";
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
        this.addProjectButton.addEventListener("click", this.handleAddProjectButtonClickFunctionReference);
    }

    handleProjectClick(event) {
        const projectId = event.currentTarget.dataset.projectId;
        const project = this.findProject(projectId);
        this.todoDetails.classList.add("inactive");
        this.todoDetails.ariaHidden = true;
        this.renderList(project);
    }

    handleAddProjectButtonClick(event) {
        this.app.addProject("Untitled Project");
        this.renderSidebar();

        const projectIndex = this.app.projects.length - 1;
        const project = this.app.projects[projectIndex];

        this.renderList(project);
        this.storageController.storeProjects(this.projects);

        // Allow the user to set a project title
        this.listHeadingInput.focus();
        this.listHeadingInput.setSelectionRange(0, this.listHeadingInput.value.length);
    }

    renderList(project) {
        this.activeList = project;
        this.listHeadingInput.value = project.title;
        this.listHeadingInput.addEventListener("change", this.handleListHeadingInputFunctionReference);
        this.deleteProjectButton.addEventListener("click", this.handleDeleteProjectButtonClickFunctionReference);
        this.listTodos.innerHTML = "";
        project.todos.forEach(todo => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            const title = document.createElement("span");
            const dueDate = document.createElement("span");

            title.textContent = todo.title;
            if (todo.dueDate !== "") {
                dueDate.textContent = format(todo.dueDate, "dd.MM.yyyy");
            }
            button.classList.add("todo");
            button.classList.add("button");
            button.classList.add(`priority-${todo.priority}`);
            button.addEventListener("click", this.handleTodoClick.bind(this));
            button.dataset.todoId = todo.id;
            button.dataset.projectId = project.id;

            this.listTodos.appendChild(li);
            li.appendChild(button);
            button.appendChild(title);
            button.appendChild(dueDate);
        });

        this.addTodoInput.dataset.projectId = project.id;
        this.addTodoInput.addEventListener("keydown", this.handleAddTodoInputKeydownFunctionReference);
    }

    handleListHeadingInputChange(event) {
        const target = event.currentTarget;
        const value = target.value.trim();
        if (value === "") {
            target.value = this.activeList.title;
        } else {
            this.activeList.title = value;
            this.storageController.storeProjects(this.projects);
            this.renderSidebar();
        }
    }

    handleDeleteProjectButtonClick(event) {
        if (this.activeList === undefined) {
            throw new Error("Can't delete current project, reference is missing.");
        } else {
            this.app.deleteProject(this.activeList.id);
            this.renderSidebar();
            this.renderList(this.app.projects[0]);
            this.storageController.storeProjects(this.projects);
        }
    }

    handleTodoClick(event) {
        const target = event.currentTarget;
        const todoId = target.dataset.todoId;
        const projectId = target.dataset.projectId;
        const project = this.findProject(projectId);
        const todo = this.findTodo(project, todoId);
        const selectedButtons = document.querySelectorAll(".selected");

        selectedButtons.forEach(element => {
            element.classList.remove("selected");
        });
        target.classList.add("selected");

        this.renderTodoDetails(todo, projectId);
    }

    renderTodoDetails(todo, projectId) {
        this.todoDetails.classList.remove("inactive");
        this.todoDetails.ariaHidden = false;

        this.todoDetails.dataset.todoId = todo.id;
        this.todoDetails.dataset.projectId = projectId;
        this.todoTitle.value = todo.title;
        this.todoDescription.value = todo.description;
        if (todo.dueDate !== "") {
            this.todoDueDate.value = format(todo.dueDate, "yyyy-MM-dd");
        } else {
            this.todoDueDate.value = todo.dueDate;
        }
        this.todoPriority.value = todo.priority;

        // REFACTOR? Add eventListener to shared parent? Or specific eventListeners (see editAttribute())?
        this.todoTitle.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoDescription.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoDueDate.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoPriority.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);

        this.deleteTodoButton.addEventListener("click", this.handleDeleteTodoButtonClickFunctionReference);
    }

    handleTodoDetailsChange(event) {
        const target = event.target;
        const value = target.value;
        const todoId = this.todoDetails.dataset.todoId;
        const projectId = this.todoDetails.dataset.projectId;
        const project = this.findProject(projectId);
        const todo = this.findTodo(project, todoId);

        // TODO: Refactor to use data attribute?
        const targetClass = target.classList[0];
        if (targetClass === "todo__title") {
            todo.title = value;
        } else if (targetClass === "todo__description") {
            todo.description = value;
        } else if (targetClass === "todo__due-date") {
            if (value !== "") {
                todo.dueDate = new Date(value);
            }
        } else if (targetClass === "todo__priority") {
            todo.priority = +value;
        } else {
            throw new Error(`Unknown change of attribute "${targetClass}" of todo "${todoId}" in project "${projectId}".`);
        }

        this.storageController.storeProjects(this.projects);
        this.renderList(project);
    }

    editAttribute(attribute, value) {
        // REFACTOR? Make handleTodoDetailsChange shorter
    }

    handleAddTodoInputKeydown(event) {
        if (event.key === "Enter") {
            const target = event.target;
            const value = target.value.trim();
            if (value.length > 0) {
                const projectId = event.target.dataset.projectId;
                const project = this.findProject(projectId);
                // Skips App and directly works with Project.addTodo()
                project.addTodo(value);
                this.storageController.storeProjects(this.projects);
                this.renderList(project);
            }
            target.value = "";
        }
    }

    handleDeleteTodoButtonClick(event) {
        const target = event.currentTarget;
        let parent = target.parentElement;
        const todoId = parent.dataset.todoId;
        const projectId = parent.dataset.projectId;
        const project = this.findProject(projectId);

        // Skips App and directly works with Project.removeTodo()
        project.removeTodo(todoId);

        this.todoDetails.classList.add("inactive");
        this.todoDetails.ariaHidden = true;
        this.storageController.storeProjects(this.projects);
        this.renderList(project);
    }

    findProject(projectId) {
        return this.projects.find((project, index, projects) => {
            return project.id === projectId;
        });
    }

    findTodo(project, todoId) {
        return project.todos.find((todo, index, projects) => {
            return todo.id === todoId;
        });
    }
};

// TODOs
// Scope creep vermeiden!!!
// Assignment 5
// - Expand a single todo to see/edit its details -> handleTodoClick implementieren
//  * Due date, description etc. anzeigen ✅
//  * Styling: Als Leiste rechts öffnen ✅
//  * Edit details ✅
// - show duedate in todo overview ✅
// - change color in todo overview for different priorities ✅
// - Delete a todo. ✅
// Add a todo ✅
// Create new project
// - Edit project names (on creation) ✅
// - Add storage persistence ✅
// - Fix UI when project lists fills whole screen height ✅
// Delete a project ✅
// - Disable for default project
// Remember opened project (don't change project on page reload)
// Basic responsiveness

// Ideen - erst Lernwert kurz mit ChatGPT reflektieren
// - "Done" marker ergänzen
// - Projektunabhängige Listen (All, Planned, Today, Done)
// - Ändern der Reihenfolge von Todos in Listen-Ansicht via Drag and Drop -> zurückgestellt
// - Überfällige und/oder heutige Todos visuell hervorheben
// - Use app methods in DisplayController instead of directly accessing projects