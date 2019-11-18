import React, { Component } from 'react';

interface BoardProps {
  board: string[],
  valid: string|null,
  click(i: number): any
}

class Board extends Component<BoardProps> {
  clickTile(idx: number, ev: any){
    this.props.click(idx);
    ev.target.classList.toggle('selected');
  }
  renderTile(idx: number){
    return (
      <button key={`tile-${idx}`} className="letter" onClick={(ev) => this.clickTile(idx, ev)}>
        {this.props.board[idx]}
      </button>
    );
  }
  render(){
    return(
      <div className={ `gameboard ${this.props.valid}` }>
        {this.props.board.map((val: string, i: number)=>{
          return this.renderTile(i);
        })}
      </div>);
  }
}
export default Board;
