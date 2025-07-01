const ScoreBoard = require("../src/services/Scoreboard");

let scoreboard;

beforeEach(() => {
  scoreboard = new ScoreBoard();
});

describe("test startMatch", () => {
  test("should start match with home and away teams with 0 - 0 score", () => {
    const matches = scoreboard.startMatch("Team A", "Team B");
    expect(matches).toHaveLength(1);
    expect(matches[0].homeTeam).toBe("Team A");
    expect(matches[0].awayTeam).toBe("Team B");
    expect(matches[0].homeScore).toBe(0);
    expect(matches[0].awayScore).toBe(0);
  });

  test("return error when starting match with same teams", () => {
    scoreboard.startMatch("Team A", "Team B");
    expect(() => scoreboard.startMatch("Team A", "Team B")).toThrow(
      "Match already started with Team A and Team B"
    );
  });
});

describe("test updateScore", () => {
  test("updates score correctly", () => {
    const matches = scoreboard.startMatch("Team A", "Team B");
    scoreboard.updateScore("Team A", "Team B", 2, 3);
    expect(matches[0].homeScore).toBe(2);
    expect(matches[0].awayScore).toBe(3);
  });

  test("check that scores are non negative integers", () => {
    scoreboard.startMatch("Team A", "Team B");

    expect(() => scoreboard.updateScore("Team A", "Team B", -2, -3)).toThrow(
      "Scores must be non-negative numbers."
    );
    expect(() => scoreboard.updateScore("Team A", "Team B", "1", "2")).toThrow(
      "Scores must be non-negative numbers."
    );
  });

  test("return an error when update non existing match", () => {
    expect(() => scoreboard.updateScore("Team A", "Team B", 2, 3)).toThrow(
      "Match not found"
    );
  });
});

describe("test finishMatch", () => {
  test("Remove finished match from scoreboard", () => {
    const matches = scoreboard.startMatch("Team A", "Team B");
    scoreboard.finishMatch("Team A", "Team B");
    expect(matches).toHaveLength(0);
  });

  test("return an error when finish non existing match", () => {
    expect(() => scoreboard.finishMatch("Team A", "Team B")).toThrow(
      "Match not found"
    );
  });
});

describe("test getSummary", () => {
  test("orders summary by total score and start time", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 0, 5);

    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.updateScore("Spain", "Brazil", 10, 2);

    scoreboard.startMatch("Germany", "France");
    scoreboard.updateScore("Germany", "France", 2, 2);

    scoreboard.startMatch("Uruguay", "Italy");
    scoreboard.updateScore("Uruguay", "Italy", 6, 6);

    scoreboard.startMatch("Argentina", "Australia");
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

    const summary = scoreboard.getSummary();
    expect(summary).toEqual([
      "Uruguay 6 - 6 Italy",
      "Spain 10 - 2 Brazil",
      "Mexico 0 - 5 Canada",
      "Argentina 3 - 1 Australia",
      "Germany 2 - 2 France",
    ]);
  });
});
