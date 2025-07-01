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
    const matches = scoreboard.startMatch("Team A", "Team B");
    expect(() => scoreboard.startMatch("Team A", "Team B")).toThrow(
      "Match already started with Team A and Team B"
    );
  });
});
