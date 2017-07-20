import Node from './Node'

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(data) {
    const node = new Node()

    if (!this.root) {
      this.root = node;
    }

    let letters = [...data.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
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
      return a.length - b.length || b.frequency - a.frequency || b.timeStamp - a.timeStamp;
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
