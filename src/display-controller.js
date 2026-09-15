export class DisplayController {
    body = document.querySelector("body");
    projectList = this.body.querySelector(".project-list");

    constructor() { }

    renderSidebar(projects) {
        projects.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project.title;
            this.projectList.appendChild(li);
        });
    }
};