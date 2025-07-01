const Match = require("../models/Match");

class ScoreBoard {
  constructor() {
    this.matches = [];
  }

  startMatch(homeTeam, awayTeam) {
    const match = new Match(homeTeam, awayTeam);
    this.matches.push(match);
    return this.matches;
  }
}

module.exports = ScoreBoard;
