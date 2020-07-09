const GameState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  START: Symbol("start"),
  WAIT: Symbol("wait"),
  CHOICE: Symbol("choice"),
  DICE: Symbol("dice"),
  PLAY: Symbol("play"),
  NIGHT: Symbol("night"),
});

module.exports = class Game {
  constructor() {
    this.stateCur = GameState.WELCOMING;
  }

  makeAMove(sInput) {
    let sReply = "";
    switch (this.stateCur) {
      case GameState.WELCOMING:
        sReply =
          "You wake up because of the noise in your room. What to do next: WAIT until the noise stops or TURN ON the light?";
        this.stateCur = GameState.START;
        break;

      case GameState.START:
        if (sInput.toLowerCase().match("wait")) {
          sReply =
            "The noise is getting louder.  What to do? Continue to WAIT or TURN ON the light?";
          this.stateCur = GameState.START;
        } else if (
          sInput.toLowerCase().match("turn on") ||
          sInput.toLowerCase().match("turn")
        ) {
          sReply =
            "In complete darkness, you've found a switch, but it does not work, there is no light in the room. There was only one option - GO down to find the flashlight or matches.";
          this.stateCur = GameState.CHOICE;
        } else {
          sReply = "You should choose what to do: WAIT or TURN ON the light";
        }
        break;

      case GameState.CHOICE:
        if (sInput.toLowerCase().match("go")) {
          sReply =
            "Together with the flashlight, you found playing dice. Do you want to play a very-very simple game? You call the number on the dice (from 1 to 6), if this number drops out at least once from 3 attempts, then you won. What do you chose: PLAY or go BACK to the room?";
          this.stateCur = GameState.DICE;
        } else {
          sReply = "You should type GO";
        }
        break;

      case GameState.DICE:
        if (sInput.toLowerCase().match("play")) {
          sReply = "What number should NOT fall out?";
          this.stateCur = GameState.PLAY;
        } else if (
          sInput.toLowerCase().match("back") ||
          sInput.toLowerCase().match("go back")
        ) {
          sReply =
            "You are back in your room. There is nothing in it. Perhaps the wind scared you. You can go TO BED or go down to PLAY again.";
          this.stateCur = GameState.NIGHT;
        } else {
          sReply = "You should chose PLAY or go BACK";
        }
        break;

      case GameState.NIGHT:
        {
          if (
            sInput.toLowerCase().match("to bed") ||
            sInput.toLowerCase().match("bed")
          ) {
            sReply =
              " Oops ... you here this noise again, it is not a wind ... where is your flashlight? Something cold tore it from your hands!";
            this.stateCur = GameState.START;
          }
        }
        break;

      case GameState.PLAY: {
        let num = sInput;
        if (num > 6 || num <= 0) {
          sReply = "The number must be between 1 and 6, try again";
          this.stateCur = GameState.PLAY;
        } else {
          let win = 0;
          for (let i = 0; i < 3; i++) {
            let res = Math.floor(Math.random() * 6) + 1;
            if (num == res) {
              win = +1;
            }
          }

          if (win != 0) {
            sReply =
              "Hooray! You managed to guess the number!. You won! Do you want to PLAY again or go BACK to room?";
          } else {
            sReply =
              "Oops, you did not manage to guess the number! Do you want to PLAY again or go BACK to room?";
          }
          this.stateCur = GameState.DICE;
        }
      }
    }
    return [sReply];
  }
};
