pl.view.createBook = {
    setupUserInterface: function () {
        // Find save button from document object
        var saveButton = document.forms['Book'].commit;
        // load all book objects
        Book.loadAll();
        // Call handleSavebutton when savebutton has click event
        saveButton.addEventListener("click",
            pl.view.createBook.handleSaveButtonClickEvent);
        // Save all books before window object, doc object and resources are unloaded.
        // Commonly used in confirm leave page
        window.addEventListener("beforeunload", function () {
            Book.saveAll();
        });
    },
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Book'];
        var slots = {
            isbn: formEl.isbn.value,
            title: formEl.title.value,
            year: formEl.year.value
        };
        Book.add(slots);
        formEl.reset();
    }
};