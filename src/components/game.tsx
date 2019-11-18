import React, { Component } from 'react';
import Board from './board';
import Trie from '../struc/trie';

class Game extends Component<{}, { board: string[], moves: number[], word: string, isValid: string|null, dictionary: any }> {
  constructor(props: any){
    super(props);
		this.state = {
      board: ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'], 
      moves: Array(16).fill(-1),
      word: '',
      isValid: null,
      dictionary: new Trie()
    };
  }
  componentDidMount(){
    const dictionary = this.state.dictionary,
          boardTestOne = require('../data/test-board-1.json'),
          boardTestTwo = require('../data/test-board-2.json'),
          wordCollection = require('../data/dictionary.json');
    this.setState({ board: boardTestOne.board }); // setting both state to remove unused-vars lint
    this.setState({ board: boardTestTwo.board });
    // Dictionary Insertion from Collection
    console.group('Dictionary Log');
    for (let i = 0; i < wordCollection.words.length; ++i){
      dictionary.add(wordCollection.words[i]);
    }
    console.log(`Total Words in Dictionary: ${dictionary.count}`);
    console.groupEnd();
  }
	playerClear(){
    document.querySelectorAll('button.selected').forEach((el: any) => {
      el.classList.remove('selected');
    });
    this.setState({ moves: Array(16).fill(-1), word: '', isValid: 'pending' });
	}
  playerSelectTile(ind: number){
    var word = this.state.word, 
        moves = this.state.moves,
        letterPosition = moves[ind],
        wordSearch;
    // check if already selected tile
    if (letterPosition !== -1){
      // splice at the correct position of the word
      switch (letterPosition){
        case 0:
          word = word.substr(1); break;
        case word.length - 1:
          word = word.substr(0, word.length - 1); break;
        default:
          word = word.substr(0,letterPosition) + word.substr(letterPosition+1);
          break;
      }
      // decrement the position of all characters right of pointer
      // since we are removing one character from the word string
      for (let i = 0; i < moves.length; ++i){
        if (moves[i] > letterPosition)
          --moves[i];
      }
      moves[ind] = -1;
    } else {
      word += this.state.board[ind];
      moves[ind] = word.length - 1;
    }
    this.setState({ word: word, moves: moves });
    // validate word in dictionary
    wordSearch = this.state.dictionary.has(word);
    if (!wordSearch.found)
      this.setState({ isValid: 'invalid' });
    else if (wordSearch.found && wordSearch.completeWord)
      this.setState({ isValid: 'valid' });
    else
      this.setState({ isValid: 'pending' });
  }
  render(){
    var word = this.state.word || '\u0020';
    return(
      <div className="game-container">
				<div className="game-clear" onClick={() => this.playerClear()}>
          <div className="clear-text">clear word</div>
          <div className="clear-icon">✕</div>
        </div>
        <Board 
          board={this.state.board}
          valid={this.state.isValid}
          click={(i) => this.playerSelectTile(i)}  
        />
        <div className="word-container">
          <div className={`word-display ${this.state.isValid}`}>{word}</div>
        </div>
      </div>);
  }
}

export default Game;
