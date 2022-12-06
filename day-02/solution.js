const fs = require("fs");

const RESULTS_POINTS = {
    Z: 6, // win
    Y: 3, // draw
    X: 0, // loss
};

const SHAPES_SCORE = {
    X: {
        score: 1,
        A: RESULTS_POINTS.Y,
        B: RESULTS_POINTS.X,
        C: RESULTS_POINTS.Z,
    },
    Y: {
        score: 2,
        A: RESULTS_POINTS.Z,
        B: RESULTS_POINTS.Y,
        C: RESULTS_POINTS.X,
    },
    Z: {
        score: 3,
        A: RESULTS_POINTS.X,
        B: RESULTS_POINTS.Z,
        C: RESULTS_POINTS.Y,
    },
    A: {
        X: 3,
        Y: 1,
        Z: 2,
    },
    B: {
        X: 1,
        Y: 2,
        Z: 3,
    },
    C: {
        X: 2,
        Y: 3,
        Z: 1,
    },
};

function parseStrategies() {
    const data = fs.readFileSync("input.txt", "utf8").toString();
    return data.split("\n").map((strategy) => strategy.split(" "));
}

function playRockPaperScissors(strategies) {
    let totalScore = 0;
    for (let strategy of strategies) {
        const myShape = SHAPES_SCORE[strategy[1]];
        totalScore += myShape.score + myShape[strategy[0]];
    }
    return totalScore;
}

function guessRockPaperScissorsPlay(strategies) {
    let totalScore = 0;
    for (let strategy of strategies) {
        const opponentShape = SHAPES_SCORE[strategy[0]];
        totalScore += opponentShape[strategy[1]] + RESULTS_POINTS[strategy[1]];
    }
    return totalScore;
}

function main() {
    const strategies = parseStrategies();
    let totalScore = playRockPaperScissors(strategies);

    console.log(
        `What would your total score be if everything goes exactly according to your strategy guide? Answer: ${totalScore}`
    );

    totalScore = guessRockPaperScissorsPlay(strategies);

    console.log(
        `Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide? ${totalScore}`
    );
}

main();
