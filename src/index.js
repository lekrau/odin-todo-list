import "./styles.css";
import { App } from "./app.js";
import { DisplayController } from "./display-controller.js";
import { StorageController } from "./storage-controller.js";
import { runConsoleTests } from "./console-test.js";

const app = new App();
const storageController = new StorageController("localStorage");

// runConsoleTests(app);
// storageController.storeProjects(app.projects);

storageController.loadStorage(app);

const displayController = new DisplayController(app, storageController);
displayController.renderSidebar();
displayController.renderList(app.projects[0]);
