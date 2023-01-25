/**
 * Model class for Book object
 * A record must be supplied to the constructor containing the following properties:
 * * isbn: international standard book number
 * * title
 * * year
 * @param {Record} slots 
 */
function Book(slots) {
    // assign default values
    this.isbn = "";   // string
    this.title = "";  // string
    this.year = 0;    // number (int)
    // assign properties only if the constructor is invoked with an argument
    if (arguments.length > 0) {
        this.setIsbn(slots.isbn);
        this.setTitle(slots.title);
        this.setYear(slots.year);
        if (slots.edition) this.setEdition(slots.edition); // optional attribute
    }
};

// Class-level static properties 
/**
 * Stores map representing collection of all Book instances managed by the application
 */
Book.instances = {};

// Class-level static methods
/**
 * Load all managed Book instances from persistent storage
 */
Book.loadAll = function () {
    var i = 0, key = "", keys = [], bookTableString = "", bookTable = {};
    try {
        // Retrieve bookTable string from local storage stored in key
        if (localStorage["bookTable"]) {
            bookTableString = localStorage["bookTable"];
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    // If string was non-empty or truthy, see https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript
    if (bookTableString) {
        // Deserialize JSON string to JS object
        bookTable = JSON.parse(bookTableString);
        keys = Object.keys(bookTable);
        console.log(keys.length + " books loaded.");
        for (i = 0; i < keys.length; i++) {
            // for each untyped record stored in value, 
            // convert to Book object and store in instances
            key = keys[i];
            Book.instances[key] = new Book(bookTable[key]);
        }
    }
};

/**
 * Save all managed book instances in memory to persistent storage
 */
Book.saveAll = function () {
    var bookTableString = "";
    var error = false;
    var nmrOfBooks = Object.keys(Book.instances).length;

    try {
        // Serialize JS objects into JSON string
        bookTableString = JSON.stringify(Book.instances);
        // Store JSON string in local storage
        localStorage["bookTable"] = bookTableString;
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfBooks + " books saved.");
};

/**
 * Create and store new Book record in memory 
 */
Book.add = function (slots) {
    var book = null;
    try {
        book = new Book(slots);
    } catch (e) {
        console.log(e.name + ": " + e.message);
        book = null;
    }
    if (book) {
        Book.instances[book.isbn] = book;
        console.log(book.toString() + " created!");
    }
};

/**
 * Update an existing Book record in memory
 */
Book.update = function (slots) {
    var book = Book.instances[slots.isbn],
        noConstraintViolated = true,
        updatedProperties = [],
        objectBeforeUpdate = util.cloneObject(book);
    try {
        if (book.title !== slots.title) {
            book.setTitle(slots.title);
            updatedProperties.push("title");
        }
        if (book.year !== parseInt(slots.year)) {
            book.setYear(slots.year);
            updatedProperties.push("year");
        }
        if (slots.edition && book.edition !== parseInt(slots.edition)) {
            book.setEdition(slots.edition);
            updatedProperties.push("edition");
        }
    } catch (e) {
        console.log(e.name + ": " + e.message);
        noConstraintViolated = false;
        // restore object to its state before updating
        Book.instances[slots.isbn] = objectBeforeUpdate;
    }
    if (noConstraintViolated) {
        if (updatedProperties.length > 0) {
            console.log("Properties " + updatedProperties.toString() +
                " modified for book " + slots.isbn);
        } else {
            console.log("No property value changed for book " + slots.isbn + " !");
        }
    }
};

/**
 * Delete a Book instance from memory
 */
Book.destroy = function (isbn) {
    // Check if book exists in memory
    if (Book.instances[isbn]) {
        // Delete instance
        console.log("Book " + isbn + " deleted");
        delete Book.instances[isbn];
    } else {
        console.log("There is no book with ISBN " + isbn + " in the database!");
    }
};

/**
 * Create a few example book records to use as test data and save in persistent storage
 */
Book.createTestData = function () {
    Book.instances["006251587X"] = new Book({ isbn: "006251587X", title: "Weaving the Web", year: 2000 });
    Book.instances["0465026567"] = new Book({ isbn: "0465026567", title: "Gödel, Escher, Bach", year: 1999 });
    Book.instances["0465030793"] = new Book({ isbn: "0465030793", title: "I Am A Strange Loop", year: 2008 });
    Book.saveAll();
};

/**
 * Clear book records from persistent storage
 */
Book.clearData = function () {
    if (confirm("Do you really want to delete all book data?")) {
        localStorage["bookTable"] = "{}";
    }
};
/**
 * Checks formatting of the provided isbn id.
 * isbn needs to be a string of length 10 or length 9 appended with X
 * 
 * @param {*} id 
 * @returns 
 */
Book.checkIsbnFormat = function (id) {
    if (!id) {
        return new NoConstraintViolation();
    } else if (typeof (id) !== "string" || id.trim() === "") {
        return new RangeConstraintViolation("The ISBN must be a non-empty string!");
    } else if (!/\b\d{9}(\d|X)\b/.test(id)) {
        return new PatternConstraintViolation(
            'The ISBN must be a 10-digit string or a 9-digit string followed by "X"!');
    } else {
        return new NoConstraintViolation();
    }
};

/**
 * Checks uniqueness of provided isbn id
 * 
 * @param {*} id 
 * @returns 
 */
Book.checkIsbnUnique = function (id) {
    var constraintViolation = Book.checkIsbn(id);
    if ((constraintViolation instanceof NoConstraintViolation)) {
        if (!id) {
            constraintViolation = new MandatoryValueConstraintViolation(
                "A value for the ISBN must be provided!");
        } else if (Book.instances[id]) {
            constraintViolation = new UniquenessConstraintViolation(
                "There is already a book record with this ISBN!");
        } else {
            constraintViolation = new NoConstraintViolation();
        }
    }
    return constraintViolation;
};

// Instance-level methods
/**
 * Sets isbn for this Book object
 * 
 * @param {*} id 
 */
Book.prototype.setIsbn = function (id) {
    var validationResult = Book.checkIsbnUnique(id);
    // instanceof checks if validationResult is of class  
    if (validationResult instanceof NoConstraintViolation) {
        this.isbn = id;
    } else {
        throw validationResult;
    }
};

Book.prototype.toString = function () {
    return "Book{ ISBN:" + this.isbn + ", title:" +
        this.title + ", year:" + this.year + "}";
};