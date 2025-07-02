# Live Football World Cup Scoreboard

A simple JavaScript library that simulates a live football match scoreboard. Built using OOP principles and tested with Jest, it allows you to start matches, update scores, finish games, and get a live summary of all current matches.

---

## Features

- Start a new football match
- Update scores with validation
- Finish a match and remove it from the scoreboard
- Get a summary of live matches, sorted by:
  1. **Total score (desc)**
  2. **Most recently started match**

---

## Installation

Clone the repository or copy the files into your project.

```bash
git clone https://github.com/RMahammad/live-football-world-cup-score-board.git
cd football-scoreboard
npm install
```

---

## Project Structure

```
.
├── models
│   └── Match.js         # Match class
├── services
│   └── Scoreboard.js    # ScoreBoard class
├── src
│   └── index.js         # Exports ScoreBoard and Match
├── tests # Full test coverage using Jest
│   └── Scoreboard.test.js  
│   └── index.test.js 
```

---

## Usage

### Import the Library

```js
const { ScoreBoard, Match } = require('./src');
```

### Start a Match

```js
const scoreboard = new ScoreBoard();
scoreboard.startMatch("Spain", "Germany");
```

### Update the Score

```js
scoreboard.updateScore("Spain", "Germany", 2, 1);
```

### Finish a Match

```js
scoreboard.finishMatch("Spain", "Germany");
```

### Get Summary

```js
const summary = scoreboard.getSummary();
console.log(summary);
// Output: [ 'Spain 2 - 1 Germany' ]
```

---

## Testing

This project uses **Jest** for testing.

To run the tests:

```bash
npm test
```

### What's Covered:

- Starting a match
- Handling duplicate or invalid inputs
- Updating and validating scores
- Finishing matches
- Getting sorted match summaries
- Validating main exports via `index.js`

---

## Validation Rules

- Team names must be non-empty strings.
- Scores must be non-negative integers.
- A match can’t be started twice.
- You can only update or finish existing matches.

---

## Example Output

When `getSummary()` is called, it returns matches like this:

```
[
  'Uruguay 6 - 6 Italy',
  'Spain 10 - 2 Brazil',
  'Mexico 0 - 5 Canada',
  'Argentina 3 - 1 Australia',
  'Germany 2 - 2 France'
]
```

Sorted by:
- Highest total score first
- If scores are equal, the most recent match appears first