import { Todo } from "./todo.js";

export class Project {
    _todos = [];
    _title;

    constructor(title) {
        this._title = title;
        this._id = crypto.randomUUID();
    }

    addTodo(title) {
        this._todos.push(new Todo(title));
    }

    removeTodo(title) {
        // Will cause problems for duplicate titles -> use id to identify Todo
        const index = this._todos.findIndex((todo, index, todos) => {
            return todo.title === title;
            // Equivalent?
            // return todos[index].title === title;
        });
        // console.log(index);
        // console.log(this._todos[index]);

        if (index === -1) {
            throw new Error(`Can't remove todo "${title}", not found.`);
        } else {
            this._todos.splice(index, 1);
        }
    }

    get todos() {
        return this._todos;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }
};