class ViewModel {
    addTodo = (element) => {
        const title = element.title.value;
        const lastElementIndex = this.todos().length - 1;
        let id;

        if (lastElementIndex === -1) {
            id = 1;
        } else {
            id = this.todos()[lastElementIndex].id + 1;
        }

        const newTodo = {
            id,
            title,
            complited: false
        };

        if (title) {
            this.todos.push(newTodo);
            element.reset();
        }
    }

    getTodoId = (event) => {
        return parseInt(event.target.parentElement.id.match(/-(\d+)/)[1]);
    }

    getTodo = (event) => {
        return this.todos().find(todo => todo.id === this.getTodoId(event));
    }

    removeTodo = (element, event) => {
        const id = this.getTodoId(event);
        const todo = this.getTodo(event);

        if (id && todo) {
            this.todos.remove(todo);
        }
    }

    compliteTodo = (element, event) => {
        const id = this.getTodoId(event);
        const todo = this.getTodo(event);
        const updatedTodo = { ...todo, complited: true };

        if (id && todo) {
            this.todos.replace(todo, updatedTodo);
        }
    }
}

ko.bindingHandlers.todosStateManager = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos && JSON.parse(savedTodos).length) {
            viewModel.todos = ko.observableArray(JSON.parse(savedTodos));
        } else {
            viewModel.todos = ko.observableArray([
                { id: 1, title: 'learn M2', complited: false },
                { id: 2, title: 'learn React', complited: false },
                { id: 3, title: 'learn Vue', complited: false },
                { id: 4, title: 'learn HTML', complited: true }
            ]);
        }
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        localStorage.setItem('todos', JSON.stringify(viewModel.todos()))
    }
};

ko.applyBindings(new ViewModel);
