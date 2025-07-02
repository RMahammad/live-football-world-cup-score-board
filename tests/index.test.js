const pkg = require('../src/index');

describe('package entrypoint (index.js)', () => {
  test('exports Match', () => {
    expect(pkg.Match).toBeDefined();
    expect(typeof pkg.Match).toBe('function');
  });

  test('exports ScoreBoard', () => {
    expect(pkg.ScoreBoard).toBeDefined();
    expect(typeof pkg.ScoreBoard).toBe('function');
  });
});
