import "./styles.css";
import { App } from "./app.js";
import { DisplayController } from "./display-controller.js";
import { runConsoleTests } from "./console-test.js";

const app = new App();
runConsoleTests(app);

const displayController = new DisplayController(app.projects);
displayController.renderSidebar();
displayController.renderList(app.projects[0]);