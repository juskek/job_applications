pl.view.updateBook = {
    setupUserInterface: function () {
      // find form, save button and select dropdown list
      var formEl = document.forms['Book'];
      var saveButton = formEl.commit;
      var selectBookEl = formEl.selectBook;

      var i=0;
      var key="";
      var keys=[];
      var book=null;
      var optionEl=null;

      // load all book objects
      Book.loadAll();

      // populate the selection list with books
      keys = Object.keys( Book.instances);
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        book = Book.instances[key];
        // Create option element
        optionEl = document.createElement("option");
        optionEl.text = book.title;
        optionEl.value = book.isbn;
        // Add option element to dropdown list
        // null to add to end of list
        selectBookEl.add( optionEl, null);
      }

      // when change event occurs in dropdown list, populate the form with the book data
      selectBookEl.addEventListener("change", function () {
          var book=null, key = selectBookEl.value;
          if (key) {
            book = Book.instances[key];
            formEl.isbn.value = book.isbn;
            formEl.title.value = book.title;
            formEl.year.value = book.year;
          } else {
            formEl.isbn.value = "";
            formEl.title.value = "";
            formEl.year.value = "";
          }
      });

      // when save button is clicked, callback
      saveButton.addEventListener("click", 
          pl.view.updateBook.handleUpdateButtonClickEvent);
      // before window/doc object and resources are unloaded, save all books
      window.addEventListener("beforeunload", function () {
          Book.saveAll(); 
      });
    },
    // save updated data
    handleUpdateButtonClickEvent: function () {
      // find form with id Book
      var formEl = document.forms['Book'];
      var slots = { isbn: formEl.isbn.value, 
          title: formEl.title.value, 
          year: formEl.year.value
      };
      // update books
      Book.update( slots);
      // reset the form
      formEl.reset();
    }
  };