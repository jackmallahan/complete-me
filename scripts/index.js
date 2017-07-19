import Trie from '../scripts/Trie'
import Node from '../scripts/Node'


console.log('loaded');

const newTree = new Trie()

newTree.populate(dictionary)
console.log(newTree)
