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

  updateScore(homeTeam, awayTeam, homeScore, awayScore) {
    const match = this.matches.find(
      (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );

    if (!match) {
      throw new Error("Match not found");
    }

    match.updateScore(homeScore, awayScore);
  }

  finishMatch(homeTeam, awayTeam) {
    // Todo
  }
}

module.exports = ScoreBoard;
