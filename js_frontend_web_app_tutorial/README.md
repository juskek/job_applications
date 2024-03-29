# JavaScript Front-End Web App Tutorial
[Source](https://www.codeproject.com/Articles/753724/JavaScript-Front-End-Web-App-Tutorial-Part)

**Features**
* No third-party frameworks, e.g. jQuery/Angular/React, which create black-box deps and overheads.
* Includes one object type: Book
* Includes the standard CRUD data management operations: Create, Read, Update, Delete
* Styling with CSS
* Input via HTML forms
* Form validation using HTML5 setCustomValidity and checkValidity

**Data Model**
Manage information about books

Data Validation Constrations
* isbn: mandatory and unique book id with length 10 or 9 followed by X, type non empty string
* title: mandatory, with max length 50, type non-empty string
* year: mandatory, with interval constraint based on current year, type int
* edition: optional, type positive int

**Architecture**
![architecture.png](docs/architecture.png)
* Executed on user's client, not on remote web server.
* Client side rendering
* Persistent storage in 
* Persistent storage in client device, managed using `Local Storage`. Other options include IndexDB.


**Running from local**
1. Use VSCode Live Server extension to launch live server.
2. Go to `127.0.0.1/portno/index.html` (local host ip, portno assigned by live server)

* Logs can be viewed from dev tools Console in Chrome (F12)
## Step 1: HTML, CSS and JS

**HTML Overview**

* **Window Object**: Represents an open window in a browser.
* **Document Object Model (DOM)**: In memory representation of .html doc. Allows doc structure, style and content to be changed via JS or CSS.
* **Document Object**: Object created when .html is loaded into browser using DOM.
#### Preamble
* `<!DOCTYPE html>`: Doctype preamble. Tells browser what rendering mode to use. HTML is the modern standard but there are legacy standards used from before it was standardised. Latest version (HTML5) is used unless specified
* `<html>`: Root of html doc. Provides container for all html elements.

#### Elements
* `<head>`: metadata element. Defines doc title, character set, styles, scripts etc. Placed after root and before body.
* `<a>`: anchor element. Creates hyperlink to URI stored in `href`
* `<ul>`: unordered list. Contains items.
* `<table>`: table. Header row in `<thead>`.  Row in `<tr>`. Header cell in `<th>` which can have scope column for column headers appearing in header row, and scope row for row header or index rows. Data in `<tbody>` and `<td>`
* `<iframe>`: inline frame. Allows display of webpage within a webpage, i.e. .html doc in current .html doc
* `<select>`: dropdown list with options.
* `<label>`: label for some kind of input

#### Deprecated
* `<menu>`: menu tag. Creates list of interactive menu items. Replaced by `<ul>`.

#### Form Validation
* setCustomValidity: marks form input fields as valid/invalid by assigning empty/non-empty string to it
* checkValidity: invoked on form and tests if all input fields have a valid value

## JS Objects Overview

**JS objects**
* need not instantiate a class.
* have property slots (object variables)
* may have method slots
* may have key-value slots

A **record** is a set of property slots, e.g.
```
var myRecord = { firstName:"Tom", lastName:"Smith", age:26}
``` 

A **map** is a set of key-value slots, where the key is a string, e.g.
```
var numeral2number = { "one":1, "two":2, "three":3}
```
Note that a map has string keys, while a record has JS identifier keys

An **untyped object** does not instantiate a class, e.g,
```
var person1 = {  
  lastName: "Smith",  
  firstName: "Tom",
  getInitials: function () {
    return this.firstName.charAt(0) + this.lastName.charAt(0); 
  }  
};
```

**Namespace** definition using untyped object/record
```
var myApp = { model:{}, view:{}, ctrl:{} };
```

A **typed object** instantiates a class, e.g.
```
var o = new C(...)
```
Types can be retrieved using the following expression" `o.constructor.name  // returns "C"`

**Class** definition with **instance-level properties**:
```
function Person( first, last) {
  this.firstName = first; 
  this.lastName = last; 
};
```

**Instance-level method** definition:
```
Person.prototype.someFunction = function () {
  return this.firstName.charAt(0) + this.lastName.charAt(0); 
};
```

**Class-level static member** definition:
```
Person.someFunction = function (n) {
  ... 
};

Person.someProperty = 1;
```
### Accessing Document object elements
`#` is the ID selector, which matches the element with the given id
`parent > child` is the child selector, which matches the child element of some parent

## Step 2: Responsive (HTML5) constraint validation
## Step 3: Enumerations
## Step 4: Unidirectional Associations
## Step 5: Bidirectional Associations
## Step 6: Subtype Inheritance in Class Hierarchy