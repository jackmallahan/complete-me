import Trie from '../scripts/Trie'
import words from './words'
import $ from 'jquery'

const newTree = new Trie()

newTree.populate(words)

console.log(newTree.suggest('pizza'));

$('.submit-btn').on('click', () => {

  $('.append-section').append(`


    newTree.suggest($('.user-input').val())
    `)
} )

function search() {
  
}
