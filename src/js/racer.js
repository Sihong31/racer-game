const $ = require("jquery");

class Racer {
  constructor(racerContainer) {
    this.$body = $("body");
    this.playAgainBtn = this.$body.find(".replay");
    this.racerContainer = racerContainer;
    this.racers = this.racerContainer.find(".racer");
    this.header = this.racerContainer.find("h1");
    this.trackContainer = this.$body.find(".track-container");
    this.track1 = this.trackContainer.find("#track-1");
    this.track2 = this.trackContainer.find("#track-2");
    this.isPlayerOneChoice = true;
    this.startGame = false;
    this.init();
  }
  init() {
    this.events();
  }
  events() {
    this.racers.on("click", $.proxy(this.selectedRacer, this));
    this.playAgainBtn.on("click", this.playAgain);
  }
  selectedRacer(event) {
    let $target = $(event.currentTarget),
        racerID = $target.index(),
        racer = $target.find("img").attr("src"),
        racerTemplate = `<img class="track-racer" src=${racer} alt=""/>`;
    if (this.isPlayerOneChoice) {
      this.track1.append($(racerTemplate));
      this.isPlayerOneChoice = false;
      this.header.text("Choose Your Racer, Player 2");
    }
    else if (!this.isPlayerOneChoice) {
      this.track2.append($(racerTemplate));
      this.startGame = true;
      this.gameIsReady();
    }
    $target.hide();
  }
  //q == 81
  //p == 80
  gameIsReady() {
    if (this.startGame) {
      this.racerContainer.hide();
      this.trackContainer.show();
      this.raceTrackWidth = this.track1.innerWidth();
      this.racer1 = this.track1.find(".track-racer");
      this.racerWidth1 = this.racer1.width();
      this.racer2 = this.track2.find(".track-racer");
      this.racerWidth2 = this.racer2.width();
      this.moved1 = 0;
      this.moved2 = 0;
      this.$body.on("keyup", $.proxy(this.playerOneControl, this));
      this.$body.on("keyup", $.proxy(this.playerTwoControl, this));
    }
  }
  announceWinner(player) {
    this.winnerBox = this.$body.find(".winner-box");
    this.winner = this.winnerBox.find(".winner");
    this.replay = this.winnerBox.find(".replay");

    this.winnerBox.show();
    this.winner.text(`Congrats ${player} has won the race! Play again?`);
  }
  playerOneControl(event) {
    if (event.keyCode == 81) {
      this.moved1 += 20;
      this.racer1.css("margin-left", this.moved1);
      if (this.moved1 + 20 >= this.raceTrackWidth - this.racerWidth1) {
        this.$body.unbind("keyup");
        this.announceWinner("Player 1");
      }
    }
  }
  playerTwoControl(event) {
    if (event.keyCode == 80) {
      this.moved2 += 20;
      this.racer2.css("margin-left", this.moved2);
      if (this.moved2 + 20 >= this.raceTrackWidth - this.racerWidth2 ) {
        this.$body.unbind("keyup");
        this.announceWinner("Player 2");
      }
    }
  }
  playAgain() {
    window.location.reload();
  }
}

module.exports = Racer
