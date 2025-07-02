const ScoreBoard = require("../src/services/Scoreboard");

let scoreboard;

beforeEach(() => {
  scoreboard = new ScoreBoard();
});

describe("test startMatch", () => {
  test("should start match with home and away teams with 0 - 0 score", () => {
    const matches = scoreboard.startMatch("Team A", "Team B");

    expect(matches.size).toBe(1);
    const key = scoreboard._key("Team A", "Team B")
    const match = matches.get(key)
    expect(match.homeTeam).toBe("Team A");
    expect(match.awayTeam).toBe("Team B");
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  test("return error when starting match with same teams", () => {
    scoreboard.startMatch("Team A", "Team B");
    expect(() => scoreboard.startMatch("Team A", "Team B")).toThrow(
      `Match already started with Team A and Team B`
    );
  });

  test("return error when home team or away team is not a string or empty", () => {
    expect(() => scoreboard.startMatch("", "Team B")).toThrow(
      "Home team and away team must be non-empty strings"
    );
    expect(() => scoreboard.startMatch("Team A", "")).toThrow(
      "Home team and away team must be non-empty strings"
    );
    expect(() => scoreboard.startMatch(123, "Team B")).toThrow(
      "Home team and away team must be non-empty strings"
    );
    expect(() => scoreboard.startMatch("Team A", 456)).toThrow(
      "Home team and away team must be non-empty strings"
    );
  });
});

describe("test updateScore", () => {
  test("updates score correctly", () => {
    const matches = scoreboard.startMatch("Team A", "Team B");
    const key = scoreboard._key("Team A", "Team B");
    const match = matches.get(key);
    scoreboard.updateScore("Team A", "Team B", 2, 3);
    expect(match.homeScore).toBe(2);
    expect(match.awayScore).toBe(3);
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
