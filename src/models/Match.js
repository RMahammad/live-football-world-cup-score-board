class Match {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
    this.startTime = new Date();
  }

  updateScore(homeScore, awayScore) {
    // Todo
  }

  getTotalScore(){
    // Todo
  }
}


module.exports = Match;