/**
 * View controller for listBooks.html
 */
pl.view.listBooks = {
    setupUserInterface: function () {
        // Get tbody element from Document object of listBooks.html, where this script is loaded
        var tableBodyEl = document.querySelector("table#books>tbody");
        var i = 0;
        var keys = []; 
        var key = "";
        var row = {};
        // load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);
        // for each book, create a table row with a cell for each attribute
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            // Create row element in tableBodyEl
            row = tableBodyEl.insertRow();
            // -1 to append
            row.insertCell(-1).textContent = Book.instances[key].isbn;
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year;
        }
    }
};