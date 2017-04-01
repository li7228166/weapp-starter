import {observable, autorun} from "./mobx.umd.min";

class Todo {
    @observable todos;

    constructor(content) {
        this.todos = [
            {title: "吃午饭", completed: true},
            {title: "喝咖啡", completed: false}
        ];
    }
}

const todo = new Todo();
export default todo;