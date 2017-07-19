/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Node {
  constructor(letter) {
    this.letter = letter || null;
    this.isWord = false;
    this.children = {};
    this.frequency = 0;
    this.timeStamp = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_Trie__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_Node__ = __webpack_require__(0);




console.log('loaded');

const newTree = new __WEBPACK_IMPORTED_MODULE_0__scripts_Trie__["a" /* default */]()

newTree.populate(dictionary)
console.log(newTree)


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node__ = __webpack_require__(0);


class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(data) {
    const node = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* default */]()

    if (!this.root) {
      this.root = node;
    }

    let letters = [...data.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* default */](letter);
      }
      currentNode = currentNode.children[letter]
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.value += currentNode.letter;
      this.wordCount++
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    let currentNode = this.root;
    let letters = [...word.toLowerCase()];
    let suggestionsArray = [];

    for (let i = 0; i < letters.length; i++) {
      currentNode = currentNode.children[letters[i]]
    }

    const traverseTrie = (word, currentNode) => {
      let keys = Object.keys(currentNode.children);

      for (let j = 0; j < keys.length; j++) {
        const child = currentNode.children[keys[j]];
        let newString = word + child.letter;
        if (child.isWord) {
          suggestionsArray.push({name: newString, frequency: child.frequency, timeStamp: child.timeStamp});
        }
        traverseTrie(newString, child)
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestionsArray.push({name: word, frequency: currentNode.frequency, timeStamp: currentNode.timeStamp})
    }

    if (currentNode) {
      traverseTrie(word, currentNode)
    }

    suggestionsArray.sort((a, b) => {
      return b.frequency - a.frequency || b.timeStamp - a.timeStamp;
    })

    return suggestionsArray.map((obj) => {
      return obj.name
    })
  }

  select(word) {
    let wordsArray = [...word];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    currentNode.frequency++
    currentNode.timeStamp = Date.now();
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Trie;



/***/ })
/******/ ]);