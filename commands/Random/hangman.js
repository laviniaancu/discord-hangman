const commando = require('discord.js-commando');
const words = require('./words.json');
const helper = require('../../helper.js');

function tellUser(message, text) {
  try {
    message.channel.send(text);
  } catch (err) {
    console.log(err);
    console.log(err.stack);
  }
}

class HangManCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'hangman',
      group: 'random',
      memberName: 'hangman',
      description: 'Plays hangman with you.'
    });
    this.score = 0;
    this.gameReset();
  }

  gameReset() {
    this.started = false;
    this.args = '';
    this.wordNumber = helper.random(0, words.length);
    this.word = words[this.wordNumber].toLowerCase();
    console.log(`Your word is : ${this.wordNumber} ${this.word}`);
    this.answer = '';
    this.started = false;
    this.answerLen = this.word.length;
    for (let i = 0; i < this.answerLen; i++) {
      this.answer += '-';
    }
    this.mistakes = 0;
  }
  findLetter(letter) { // find letter and updates answer
    let found = false;
    if (this.word.search(letter) !== -1) {
      for (let i = 0; i < this.answerLen; i++) {
        if (this.word[i] === letter) {
          const newAnswer = this.answer.substring(0, i) + letter + this.answer.substring(i + 1);
          this.answer = newAnswer;
          found = true;
        }
      }
    }
    if (found) return true;
    return false;
  }

  checkLetter(message) {
    if (this.letter.length > 1) {
      tellUser(message, 'Please guess one letter at a time!');
      return false;
    }
    if (this.letter.length < 1) {
      tellUser(message, 'Please use !hangman followed by a letter to guess');
      return false;
    } else if (!this.letter.match(/^[a-z]+$/i)) {
      tellUser(message, `${this.letter} is not a letter!`);
      return false;
    }
    return true;
  }

  gameStart(message) {
    try {
      tellUser(message, `Let's start a new game! Your word is : ${this.answer}`);
      tellUser(message, 'Write \'!hangman\' followed by a letter to guess. Example: !hangman t');
      tellUser(message, 'Write \'!hangman reset\' to start a new game');
      this.started = true;
    } catch (err) { console.log(err.stack); }
  }

  async run(message, args) {
    this.letter = args.toLowerCase();
    // CHECKING YOUR INPUT //
    if (this.letter === 'reset') {
      tellUser(message, 'Resetting!');
      this.gameReset();
    }
    if (this.started === false) {
      this.gameStart(message);
    } else {
      // ONE NORMAL ROUND OF GUESSING //
      const theArgIsValid = this.checkLetter(message); // checks that args in one letter
      if (this.mistakes < 6) {
        const found = this.findLetter(this.letter); // this is false if we cannot find the letter
        // REPLY //
        if (found) { // you guessed a letter
          tellUser(message, 'Good guess!');
        } else if (theArgIsValid) { // the argument is valid but you did not guess
          this.mistakes++;
          if (this.mistakes === 6) {
            tellUser(message, `Nope! You made ${this.mistakes} mistake(s) so far. Last attempt!`);
          } else { tellUser(message, `Nope! You made ${this.mistakes} mistake(s) so far`); }
          }
        tellUser(message, `Your word is : ${this.answer}`);
        if (this.answer === this.word) {
          this.score++;
          tellUser(message, `A winner is you! You have guessed ${this.score} word(s) so far. Type !hangman again to play a new game.`);
          this.gameReset();
        }
      } else {
        tellUser(message, 'You lost!');
        this.gameReset();
      }
    }
  }
}
module.exports = HangManCommand;
