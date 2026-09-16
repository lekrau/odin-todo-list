export class DisplayController {
    body = document.querySelector("body");
    projectList = this.body.querySelector(".project-list");
    listTodos = this.body.querySelector(".list__todos");
    listHeading = this.body.querySelector(".list__heading");

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
        project.todos.forEach(todo => {
            console.log(todo);

            const li = document.createElement("li");
            const button = document.createElement("button");


            button.textContent = todo.title;
            button.classList.add("todo");
            // TODO
            // button.addEventListener("click", this.handleProjectClick.bind(this));
            button.dataset.todoId = todo.id;

            this.listTodos.appendChild(li);
            li.appendChild(button);
        });
    }
};

// Ziel
// 1. du das aktuelle this-/EventListener-Problem selbst löst, ✅
// 2. ein Klick auf einen Project-Button zuverlässig das zugehörige Project identifiziert, ✅
// 3. dessen Todos im Main-Bereich gerendert werden, ✅
// 4. beim Wechsel auf ein anderes Project die vorherige Liste verschwindet und die neue erscheint, ✅
// 5. sinnvollerweise auch der Project-Titel als Überschrift angezeigt wird, ✅
// 6. du den funktionierenden Stand aufräumst und committen kannst.
// Bonus: Beim initialen Laden bereits das Default-Project samt Todos anzeigen, sodass die Main-Fläche nicht erst nach dem ersten Klick gefüllt wird.