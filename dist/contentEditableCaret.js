'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * contentEditableCaret.js
 * https://github.com/HardeepAsrani/contentEditableCaret.js
 * Copyright (c) 2018 Hardeep Asrani (hardeepasrani@gmail.com)
 * Released under MIT
 */

/**
 * Returns the start position of the last occurrence of a specified value in a string.
 * 
 * @param {string} string - The string to search for.
 * @param {string} search - At which position to start the search.
 * 
 * @return {number} String index.
 */
var indexOfEnd = function indexOfEnd(string, search) {
  var io = string.indexOf(search);
  return io === -1 ? -1 : io + search.length;
};

/**
 * Returns the end position of the last occurrence of a specified value in a string.
 * 
 * @param {string} string - The string to search for.
 * @param {string} search - At which position to start the search.
 * 
 * @return {number} String index.
 */
var lastIndexOfEnd = function lastIndexOfEnd(string, search) {
  var io = string.lastIndexOf(search);
  return io === -1 ? -1 : io + search.length;
};

/**
 * Returns the node index from a NodeList.
 * 
 * @param {object} el - Element to be search for.
 * @param {string} text - Text that needs to be looked for.
 * @param {boolean} firstChild - Wheather to search for the first occurrence or the last.
 * 
 * @return {number} Node index.
 */
var getNodeIndex = function getNodeIndex(el, text, firstChild) {
  var nodeIndex = false,
      i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = el.childNodes.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (value.textContent.search(text) !== -1) {
        nodeIndex = i;
        if (el.childNodes[nodeIndex].textContent === '') {
          nodeIndex = i - 1;
        }
        if (firstChild) {
          break;
        }
      }
      i++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return nodeIndex;
};

/**
 * Returns the index of text from the node.
 * 
 * @param {object} el - Element to be search for.
 * @param {number} nodeIndex - Index of the node to search in Element.
 * @param {string} text - Text that needs to be looked for.
 * @param {boolean} order - Wheather to search for the first or last occurrence of the text.
 * @param {boolean} index - Wheather to search for the beginning or end of the text.
 * 
 * @return {number} Index of text in Node.
 */
var getNodeTextIndex = function getNodeTextIndex(el, nodeIndex, text, order, index) {
  var nodeTextIndex = el.childNodes[nodeIndex].textContent;
  if (order === true && index === true) {
    nodeTextIndex = nodeTextIndex.indexOf(text);
  } else if (order === true && index === false) {
    nodeTextIndex = indexOfEnd(nodeTextIndex, text);
  } else if (order === false && index === true) {
    nodeTextIndex = nodeTextIndex.lastIndexOf(text);
  } else {
    nodeTextIndex = lastIndexOfEnd(nodeTextIndex, text);
  }
  return nodeTextIndex;
};

/**
 * Search for string in childNodes.
 * 
 * @param {object} nodeElement - Element to be search for.
 * @param {number} nodeIndex - Index of the node to search in Element.
 * @param {number} nodeTextIndex - Index of the text to search in the node.
 * @param {string} text - Text that needs to be looked for.
 * @param {boolean} order - Wheather to search for the first or last occurrence of the text.
 * @param {boolean} index - Wheather to search for the beginning or end of the text.
 * @param {boolean} firstChild - Wheather to search for the first occurrence or the last.
 * 
 * @return {object} Object with nodeElement and nodeTextIndex.
 */
var getChildNodes = function getChildNodes(nodeElement, nodeIndex, nodeTextIndex, text, order, index, firstChild) {
  if (nodeElement.childNodes.length !== 0) {
    nodeIndex = getNodeIndex(nodeElement, text, firstChild);
    nodeTextIndex = getNodeTextIndex(nodeElement, nodeIndex, text, order, index);
    nodeElement = nodeElement.childNodes[nodeIndex];
    return getChildNodes(nodeElement, nodeIndex, nodeTextIndex, text, firstChild);
  } else {
    return [nodeElement, nodeTextIndex];
  }
};

/**
 * Set caret in contentEditable field for given string.
 * 
 * @param {object} el - Element to be search for.
 * @param {string} text - Text that needs to be looked for.
 * @param {boolean} order - Wheather to search for the first or last occurrence of the text.
 * @param {boolean} index - Wheather to search for the beginning or end of the text.
 * @param {boolean} firstChild - Wheather to search for the first occurrence or the last.
 */
var contentEditableCaret = function contentEditableCaret(el, text) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var firstChild = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

  var nodeIndex = 0;
  if (text === undefined) return;
  nodeIndex = getNodeIndex(el, text, firstChild);
  if (nodeIndex === false) return;
  var nodeTextIndex = getNodeTextIndex(el, nodeIndex, text, order, index);
  var nodeElement = el.childNodes[nodeIndex];
  nodeElement = getChildNodes(nodeElement, nodeIndex, nodeTextIndex, text, order, index, firstChild);
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(nodeElement[0], nodeElement[1]);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
};

exports.default = contentEditableCaret;
