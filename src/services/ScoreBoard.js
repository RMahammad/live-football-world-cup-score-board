const Match = require("../models/Match");

class ScoreBoard {
  constructor() {
    this.matches = new Map();
  }

  _key(homeTeam, awayTeam) {
    const home = homeTeam.trim().toLowerCase();
    const away = awayTeam.trim().toLowerCase();

    return `${home}__vs__${away}`;
  }

  startMatch(homeTeam, awayTeam) {
    if (typeof homeTeam !== "string" || typeof awayTeam !== "string") {
      throw new Error("Home team and away team must be non-empty strings");
    }

    const home = homeTeam.trim()
    const away = awayTeam.trim()

    const key = this._key(home, away);

    if (!home || !away) {
      throw new Error("Home team and away team must be non-empty strings");
    }

    if (this.matches.has(key)) {
      throw new Error(`Match already started with ${home} and ${away}`);
    }
    const match = new Match(home, away);
    this.matches.set(key, match);
    return new Map(this.matches);
  }

  updateScore(homeTeam, awayTeam, homeScore, awayScore) {
    const key = this._key(homeTeam, awayTeam);
    const match = this.matches.get(key);

    if (!match) {
      throw new Error("Match not found");
    }

    match.updateScore(homeScore, awayScore);
  }

  finishMatch(homeTeam, awayTeam) {
    const key = this._key(homeTeam, awayTeam);
    const match = this.matches.get(key);
    if (!match) {
      throw new Error("Match not found");
    }

    this.matches.delete(key);
    return new Map(this.matches);
  }

  getSummary() {
    const matchList = Array.from(this.matches.values());
    return matchList
      .slice()
      .sort((a, b) => {
        const totalDiff = b.getTotalScore() - a.getTotalScore();
        if (totalDiff !== 0) return totalDiff;

        const timeDiff = b.startTime.getTime() - a.startTime.getTime();
        if (timeDiff !== 0) return timeDiff;

        const idxA = matchList.indexOf(a);
        const idxB = matchList.indexOf(b);
        return idxB - idxA;
      })
      .map((m) => m.getScoreLine());
  }
}

module.exports = ScoreBoard;
