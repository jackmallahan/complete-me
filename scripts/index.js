import Trie from '../scripts/Trie'
import words from './words'
import $ from 'jquery'

const newTree = new Trie()

newTree.populate(words)

function appendSuggestions() {
  let userWord = $('.user-input').val()
  let suggestedWords = newTree.suggest(userWord)
  for (let i = 0; i < 15; i++) {
    if (userWord !== '' && suggestedWords[i] !== undefined){

    $('.list').append(
    `<button class="listItems">${suggestedWords[i]}</button>`
    )}
  }
}

const select = (e) => {
  let selectedWord = e.target.innerHTML;
  newTree.select(selectedWord);
  appendSuggestions();
}


function clearList() {
  $('.listItems').remove()
}

$('.user-input').on('keyup', () => {
  clearList()
  appendSuggestions()
})

$('.append-section').on('click', '.listItems', function(e) {
  clearList();
  select(e);
})
