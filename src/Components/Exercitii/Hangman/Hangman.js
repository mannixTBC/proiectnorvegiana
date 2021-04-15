import React, { Component } from 'react';
import './Hangman.css';
import { randomList } from './Words.js';

import step0 from "./icons/0.jpg";
import step1 from "./icons/1.jpg";
import step2 from "./icons/2.jpg";
import step3 from "./icons/3.jpg";
import step4 from "./icons/3.jpg";
import step5 from "./icons/5.jpg";
import step6 from "./icons/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      list : randomList(),
      
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.list[0].includes(letter) ? 0 : 1)
    }))
    console.log(this.state.list);
    if(this.state.guessed.length === this.state.list[0].length){
      this.resetButton();
      console.log('ajunge aici');

    }
    
    ;
  }

  guessedWord() {
    return this.state.list[0].split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdeifghjklmnopqrstuvwxyz".split("").map(letter => (
      <button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      list : randomList(),
      
    });
  }

  render() {
    let intrebare = this.state.list[1];
    const answer = this.state.list[0];
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "Ai castigat!";
      intrebare = '';
    }

    if (gameOver) {
      gameStat = "Ai pierdut!"
    }

    return (
      <div className="background-image">
        <h1 className='text-center'>Hangman</h1>
        <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt=""/>
        </div>
        <div className="text-center">
          <p>{intrebare}</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton}>Reset</button>
        </div>
      </div>
    )
  }
}

export default Hangman;