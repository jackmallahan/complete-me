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
          suggestionsArray.push(newString);
        }
        traverseTrie(newString, child)
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestionsArray.push(word)
    }

    if (currentNode) {
      traverseTrie(word, currentNode)
    }

    return suggestionsArray
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select() {

  }
}
