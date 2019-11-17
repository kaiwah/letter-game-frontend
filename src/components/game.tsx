import React, { Component } from 'react';
import Board from './board';
import Trie from '../struc/trie';

class Game extends Component<{}, { board: string[], moves: string, isValid: boolean|null, dictionary: any }> {
  constructor(props: any){
    super(props);
		this.state = {
      board: ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'], 
      moves: '',
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
    this.setState({ moves: '' });
	}
  playerSelectTile(ind: number){
    const tile = this.state.board[ind];
    var word = this.state.moves;
    // check if already selected tile
    if (word.indexOf(tile) !== -1)
      word = word.replace(tile,'');
    else
      word += tile;
    this.setState({ moves: word });
  }
  render(){
    var moves = this.state.moves || '\u0020';
    return(
      <div className="game-container">
				<div className="game-clear" onClick={() => this.playerClear()}>
          <div className="clear-text">clear word</div>
          <div className="clear-icon">✕</div>
        </div>
        <Board 
          board={this.state.board}
          click={(i) => this.playerSelectTile(i)}  
        />
        <div className="word-container">
          <div className={`word-display ${this.state.isValid}`}>{moves}</div>
        </div>
      </div>);
  }
}

export default Game;
