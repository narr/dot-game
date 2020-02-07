# Dot Game

## Description

Dots move from the top to the bottom of the screen. A player tries to click on the dots, and receives points when they are successful.

![Dot Game](./etc/game.gif 'Dot Game')

[Basic Functionalities]

- The game starts when a player touches or clicks the Start button; at that point, the Start button changes to a Pause button, which should pause the game until the button is touched or clicked again.
- Dots fall at a constant rate. A player should be able to use a slider to control the rate at which dots fall; at the slider's left-most position, dots should fall at a speed of 10px per second, and at the slider's right-most position, should fall at a speed of 100px per second.
- A new dot appears at a random horizontal position at the top of the box every second. A dot should not "hang" off the left or right edge of the screen.
- Dots should vary randomly in size from 10px in diameter to 100px in diameter.
- A dot's value is inversely proportional to its size, with the smallest dots worth 10 points, and the largest dots worth 1 point.
- When a player touches or clicks a dot, the dot should disappear from the box, and the score should be increased based on the dot's value.
- A new dot should also appear every 1000ms.

[Additional Functionalities]

- When a dot is removed by reaching to the bottom of the screen, the score should be decreased based on the dot's value.

## Prerequisites

[Node.js](https://nodejs.org/en/) >= version 10.0.0

## Install

```sh
npm install
```

> **_NOTE:_** For running test cases, please install **Cypress**

```sh
npm install -D cypress@3.8.3
```

## Run

```sh
npm run dev
```

After the command above, open Chrome browser with the URL, http://localhost:8000

## Run Lint

```sh
npm run lint
```

## Run test

If you installed **Cypress** already, please run a command below.

```sh
npm test
```

After the command above, it will open **Cypress** window and please run all the test from there.

![Test](./etc/test.gif 'Test')

## Run test for CI

If you installed **Cypress** already, please run a command below.

```sh
npm run ci
```
