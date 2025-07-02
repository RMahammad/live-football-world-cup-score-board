const Match = require("../models/Match");

class ScoreBoard {
  constructor() {
    this.matches = new Map();
  }

  _key(homeTeam, awayTeam) {
    return `${homeTeam}__vs__${awayTeam}`;
  }

  startMatch(homeTeam, awayTeam) {
    if (typeof homeTeam !== "string" || typeof awayTeam !== "string") {
      throw new Error("Home team and away team must be non-empty strings");
    }

    const home = homeTeam.trim();
    const away = awayTeam.trim();

    const key = this._key(home, away);

    if (!home || !away) {
      throw new Error("Home team and away team must be non-empty strings");
    }

    if (this.matches.has(key)) {
      throw new Error(`Match already started with ${home} and ${away}`);
    }
    const match = new Match(home, away);
    this.matches.set(key, match);
    return this.matches;
  }

  updateScore(homeTeam, awayTeam, homeScore, awayScore) {
    const key = this._key(homeTeam, awayTeam);
    const match = this.matches.get(key)

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
    return this.matches
      .slice()
      .sort((a, b) => {
        const totalDiff = b.getTotalScore() - a.getTotalScore();
        if (totalDiff !== 0) return totalDiff;

        const timeDiff = b.startTime.getTime() - a.startTime.getTime();
        if (timeDiff !== 0) return timeDiff;

        const idxA = this.matches.indexOf(a);
        const idxB = this.matches.indexOf(b);
        return idxB - idxA;
      })
      .map((m) => m.getScoreLine());
  }
}

module.exports = ScoreBoard;
