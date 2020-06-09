import React, { Component } from "react";
import "./Hangman.css";
import {randomWord} from './words';
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  create_UUID(){
    function _p8(s) {
      let p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        key={this.create_UUID()}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  restartGame() {
    this.setState(st => ({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }));
  }

  /** render: render game */
  render() {
    if (this.state.nWrong === this.props.maxWrong) {
      return (
          <div className='Hangman'>
            <h1>Hangman</h1>
            <h2>You have {this.state.nWrong} wrong guesses</h2>
            <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} guesses`} />
            <p className='Hangman-word'>{this.guessedWord()}</p>
            <p>YOU LOSE, the correct word was {this.state.answer}</p>
            <button onClick={this.restartGame}>Restart</button>
          </div>)
    } else {
      return (
          <div className='Hangman'>
            <h1>Hangman</h1>
            <h2>You have {this.state.nWrong} wrong guesses</h2>
            <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} guesses`}/>
            <p className='Hangman-word'>{this.guessedWord()}</p>
            <p className='Hangman-btns'>{this.generateButtons()}</p>
            <button onClick={this.restartGame}>Restart</button>
          </div>)
    }
  }
}

export default Hangman;
