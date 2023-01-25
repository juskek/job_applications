pl.view.deleteBook = {
    setupUserInterface: function () {
        // Find delete button, dropdown list
        var deleteButton = document.forms['Book'].commit;
        var selectEl = document.forms['Book'].selectBook;
        var i = 0
        var key = "";
        var keys = [];
        var book = null;
        var optionEl = null;
        // load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);
        // populate the selection list with books
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            book = Book.instances[key];
            // Create dropdown list option
            optionEl = document.createElement("option");
            optionEl.text = book.title;
            optionEl.value = book.isbn;
            // Add to dropdown list, null to append
            selectEl.add(optionEl, null);
        }
        // When delete button click event occurs, call function
        deleteButton.addEventListener("click",
            pl.view.deleteBook.handleDeleteButtonClickEvent);
        // Before window/doc object and resources unload, save all books
        window.addEventListener("beforeunload", function () {
            Book.saveAll();
        });
    },
    handleDeleteButtonClickEvent: function () {
        var selectEl = document.forms['Book'].selectBook;
        var isbn = selectEl.value;
        if (isbn) {
            Book.destroy(isbn);
            selectEl.remove(selectEl.selectedIndex);
        }
    }
};