/**
 * @fileOverview  Defines utility procedures/functions   
 * @author Gerd Wagner
 */
var util = {
 /**
  * Verifies if a value represents an integer
  * @param {number} x
  * @return {boolean}
  */
  isNonEmptyString: function (x) {
    return typeof(x) === "string" && x.trim() !== "";
  },
 /**
  * Return the next year value (e.g. if now is 2013 the function will return 2014)
  * @return {number}  the integer representing the next year value
  */
  nextYear: function () {
    var date = new Date();
    return (date.getFullYear() + 1);
  }, 
 /**
  * Verifies if a value represents an integer or integer string
  * @param {string} x
  * @return {boolean}
  */
  isIntegerOrIntegerString: function (x) {
    return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 ||
        typeof(x) === "string" && x.search(/^-?[0-9]+$/) == 0;
  },
 /**
  * Creates a clone of a data record object or extracts the data record part of an object
  * @param {object} obj
  */
  cloneRecord: function (obj) {
    var record = null;
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && typeof obj[p] != "object") {
        record[p] = obj[p];
      }
    }   
    return record;
  },
 /**
  * Creates a typed "data clone" of an object
  * Notice that Object.getPrototypeOf(obj) === obj.__proto__ 
  * === Book.prototype when obj has been created by new Book(...)
  * @param {object} obj
  */
  cloneObject: function (obj) {
    var clone = Object.create( Object.getPrototypeOf(obj));
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && typeof obj[p] != "object") {
        clone[p] = obj[p];
      }
    }
    return clone;
  },
  /**
   * Create option elements from an associative array of objects
   * and insert them into a selection list element
   *
   * @param {object} aa  An associative array of objects
   * @param {object} selList  A select(ion list) element
   * @param {string} keyProp  The standard identifier property
   * @param {string} displayProp [optional]  A property supplying the text 
   *                 to be displayed for each object
   */
  fillSelectWithOptions: function (aa, selList, keyProp, displayProp) {
    var optionEl = null, keys=[], obj=null, i=0;
    keys = Object.keys( aa);
    for (i=0; i < keys.length; i++) {
      obj = aa[keys[i]];
      obj.index = i+1;  // store selection list index
      optionEl = document.createElement("option");
      optionEl.value = obj[keyProp];
      if (displayProp) {
        // show the values of displayProp in the select list
        optionEl.text = obj[displayProp];
      }
      else {
        // show the values of keyProp in the select list
        optionEl.text = obj[keyProp];
      }
      selList.add( optionEl, null);
    }
  }
};
