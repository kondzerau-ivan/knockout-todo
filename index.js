class ViewModel {
    todos = ko.observableArray([
        {title: 'learn M2', complited: false},
        {title: 'learn React', complited: false},
        {title: 'learn Vue', complited: false},
        {title: 'learn HTML', complited: true}
    ]);
}

ko.applyBindings(new ViewModel);