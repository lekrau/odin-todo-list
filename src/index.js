import "./styles.css";
import { App } from "./app.js";
import { DisplayController } from "./display-controller.js";
import { StorageController } from "./storage-controller.js";
import { runConsoleTests } from "./console-test.js";

const app = new App();
const storageController = new StorageController("localStorage");

runConsoleTests(app);
storageController.storeProjects(app.projects);

const tempApp = new App();
storageController.loadStorage(tempApp);

// const displayController = new DisplayController(app.projects);
const displayController = new DisplayController(tempApp.projects);
displayController.renderSidebar();
// displayController.renderList(app.projects[0]);
displayController.renderList(tempApp.projects[0]);
