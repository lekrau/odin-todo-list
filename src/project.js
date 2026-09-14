import { Todo } from "./todo.js";

export class Project {
    _todos = [];
    _title;

    constructor(title) {
        this._title = title;
        this._id = crypto.randomUUID();
        return this;
    }

    addTodo(title) {
        const todo = new Todo(title);
        this._todos.push(todo);
        return todo;
    }

    removeTodo(id) {
        const index = this._todos.findIndex((todo, index, todos) => {
            return todo.id === id;
        });
        if (index === -1) {
            throw new Error(`Can't remove todo "${id}", not found in project "${this._title}".`);
        } else {
            const todoArray = this._todos.splice(index, 1);
            return todoArray[0];
        }
    }

    get id() {
        return this._id;
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