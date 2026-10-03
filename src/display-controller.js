import { format, parseISO } from "date-fns";

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

    constructor(app, storageController) {
        this.app = app;
        this.projects = app.projects;
        this.storageController = storageController;
        const activeProjectId = storageController.loadActiveProjectId();
        const activeProject = this.findProject(activeProjectId);
        if (activeProject) {
            this.activeList = activeProject;
        } else {
            this.activeList = this.projects[0];
        }
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

        const projectIndex = this.projects.length - 1;
        const project = this.projects[projectIndex];

        this.renderList(project);
        this.storageController.storeProjects(this.projects);

        // Allow the user to set a project title
        this.listHeadingInput.focus();
        this.listHeadingInput.setSelectionRange(0, this.listHeadingInput.value.length);
    }

    renderList(project) {
        if (project) {
            this.activeList = project;
            this.storageController.storeActiveProjectId(project.id);
        } else {
            // Check if the last active project was stored
            if (this.activeList) {
                project = this.activeList;
            } else {
                // Use the default project
                project = this.projects[0];
            }
        }

        this.listHeadingInput.value = project.title;

        this.listHeadingInput.addEventListener("change", this.handleListHeadingInputFunctionReference);
        if (project.id === this.projects[0].id) {
            this.deleteProjectButton.disabled = true;
        } else {
            this.deleteProjectButton.disabled = false;
            this.deleteProjectButton.addEventListener("click", this.handleDeleteProjectButtonClickFunctionReference);
        }

        this.listTodos.innerHTML = "";
        project.todos.forEach(todo => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            const title = document.createElement("span");
            const dueDate = document.createElement("span");

            title.textContent = todo.title;
            if (todo.dueDate !== "") {
                dueDate.textContent = format(parseISO(todo.dueDate), "dd.MM.yyyy");
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
            try {
                this.app.renameProject(this.activeList.id, value);
            } catch (error) {
                target.classList.add("error");
                target.value = this.activeList.title;
                setTimeout(() => {
                    target.classList.remove("error");
                }, 1000);
            }
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
            this.renderList(this.projects[0]);
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
        this.todoTitle.dataset.field = "title";
        this.todoDescription.value = todo.description;
        this.todoDescription.dataset.field = "description";
        this.todoDueDate.value = todo.dueDate;
        this.todoDueDate.dataset.field = "dueDate";
        this.todoPriority.value = todo.priority;
        this.todoPriority.dataset.field = "priority";

        this.todoTitle.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoDescription.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoDueDate.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);
        this.todoPriority.addEventListener("change", this.handleTodoDetailsChangeFunctionReference);

        this.deleteTodoButton.addEventListener("click", this.handleDeleteTodoButtonClickFunctionReference);
    }

    handleTodoDetailsChange(event) {
        const target = event.currentTarget;
        const value = target.value;
        const todoId = this.todoDetails.dataset.todoId;
        const projectId = this.todoDetails.dataset.projectId;
        const project = this.findProject(projectId);
        const targetField = target.dataset.field;

        this.app.updateTodo(todoId, projectId, targetField, value);
        this.storageController.storeProjects(this.projects);
        this.renderList(project);
    }

    handleAddTodoInputKeydown(event) {
        if (event.key === "Enter") {
            const target = event.target;
            const value = target.value.trim();
            if (value.length > 0) {
                const projectId = event.target.dataset.projectId;
                const project = this.findProject(projectId);
                this.app.addTodo(value, projectId);
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

        this.app.removeTodo(todoId, projectId);

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
