/**
 * Shims to correct behaviour of browser code that already exists.
 * See: https://developer.mozilla.org/en-US/docs/Glossary/Shim
 * Polyfill to provide modern functionality on older browsers that do not natively support it.
 * See: https://developer.mozilla.org/en-US/docs/Glossary/Polyfill
 * 
 */

'use strict'; 
/// execute js code in strict mode to prevent accidental mistakes
/// see https://www.w3schools.com/js/js_strict.asp

/**
 * Implements the instance method trim function for browsers 
 * that don't support it natively
 */
if (!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
};

/**
 * Implement some ECMASCRIPT6 methods for browsers 
 * that don't support them natively
 */
/** 
 * Implements the Number class method for isInteger if it does not exist
 */
if (!Number.isInteger) {
  Number.isInteger = function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) && 
        nVal > -9007199254740992 && nVal < 9007199254740992 && 
        Math.floor(nVal) === nVal;
  };
}

/**
 * Implements the String instance method for includes if it does not exist
 * includes returns true if a substring exists within a string
 */
if (!String.prototype.includes ) {
  String.prototype.includes = function () {
    
    // indexOf returns index of substring
    // this refers to object that is calling includes
    // i.e. String.prototype

    // while function declaration specifies no args, any no of args can be passed, 
    // which is accessed via arguments keyword
    // arguments is an array-like object that can be accessed in functions
    // arguments contains the values passed to the function
    
    // apply calls the indexOf function, 
    // substitutes String.prototype with this,
    // and passes arguments to the indexOf function
    // i.e. this.indexOf(arguments)

    return String.prototype.indexOf.apply( this, arguments ) !== -1;
  };
}
if (!Array.prototype.includes ) {
  Array.prototype.includes = function () {
    // i.e. this.indexOf(arguments) 
    return Array.prototype.indexOf.apply( this, arguments ) !== -1;
  };
}
/**
 * Compute the max/min of an array
 * Notice that apply requires a context object, which is not really used
 * in the case of a static function such as Math.max
 */
Array.max = function (array) {
  // i.e. Math.max(array)
  return Math.max.apply( Math, array);
}; 
Array.min = function (array) {
  // i.e. Math.min(array)
  return Math.min.apply( Math, array);
};
/**
 * Make a shallow copy of an array
 * 
 * Values in the array are copied exactly
 * Objects in the array are not copied, instead a reference address to the object is copied to the new array 
 * 
 * This is opposed to a deep copy where objects and sub-objects are also copied.
 */
Array.prototype.clone = function () {
  return this.slice(0);
}; 
/**
 * Test if an array is equal to another
 */
Array.prototype.isEqualTo = function (a2) {
  // Check if array lengths are the same
  // every checks if every element of this array is equal to a2 array passed in
  return (this.length === a2.length) && this.every( function( el, i) {
    return el === a2[i]; });
};

