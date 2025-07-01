class Match {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
    this.startTime = new Date();
  }

  updateScore(homeScore, awayScore) {
    if (
      homeScore < 0 ||
      awayScore < 0 ||
      !Number.isInteger(homeScore) ||
      !Number.isInteger(awayScore)
    ) {
      throw new Error("Scores must be non-negative numbers.");
    }

    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }

  getTotalScore() {
    return this.awayScore + this.homeScore;
  }

  getScoreLine() {
    return `${this.homeTeam} ${this.homeScore} - ${this.awayScore} ${this.awayTeam}`;
  }
}

module.exports = Match;
