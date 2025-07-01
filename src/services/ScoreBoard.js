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
    const idx = this.matches.findIndex(
      (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );
    if (idx === -1) {
      throw new Error("Match not found");
    }

    this.matches.splice(idx, 1);
    return this.matches;
  }

  getSummary() {
    // Todo
  }
}

module.exports = ScoreBoard;
