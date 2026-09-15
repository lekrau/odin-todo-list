export class DisplayController {
    body = document.querySelector("body");
    projectList = this.body.querySelector(".project-list");

    constructor() { }

    renderSidebar(projects) {
        projects.forEach(project => {
            const li = document.createElement("li");
            const button = document.createElement("button");

            button.textContent = project.title;
            button.classList.add("project");

            this.projectList.appendChild(li);
            li.appendChild(button);
        });
    }
};