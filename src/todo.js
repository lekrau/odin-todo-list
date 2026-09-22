export class Todo {
    _description = "";
    _dueDate = "";
    _priority = 0;
    // Potential enhancements: notes, checklist

    constructor(title) {
        this._id = crypto.randomUUID();
        this._title = title;
        return this;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }
};