const Match = require("../models/Match");

class ScoreBoard {
  constructor() {
    this.matches = [];
  }

  startMatch(homeTeam, awayTeam) {
    if (
      this.matches.some(
        (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
      )
    ) {
      throw new Error("Match already started with Team A and Team B");
    }
    const match = new Match(homeTeam, awayTeam);
    this.matches.push(match);
    return this.matches;
  }
}

module.exports = ScoreBoard;
