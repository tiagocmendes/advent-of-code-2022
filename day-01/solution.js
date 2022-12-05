const fs = require("fs");

function parseCaloriesRecords(data) {
    const caloriesRecords = data.split("\n");

    let caloriesByElf = [];
    let numberOfElves = 0;

    for (let record of caloriesRecords) {
        if (record === "") {
            numberOfElves++;
            continue;
        }

        if (!caloriesByElf[numberOfElves]) {
            caloriesByElf[numberOfElves] = [];
        }

        caloriesByElf[numberOfElves].push(parseInt(record));
    }
    return caloriesByElf;
}

function computeTotalCaloriesByElf(data) {
    const caloriesByElf = parseCaloriesRecords(data);

    return caloriesByElf.map((calories) =>
        calories.reduce((acc, value) => acc + value, 0)
    );
}

function findElfWithMostCalories(data) {
    let totalCaloriesByElf = computeTotalCaloriesByElf(data);

    return Math.max(...totalCaloriesByElf);
}

function findTopThreeElvesWithMostCalories(data) {
    let totalCaloriesByElf = computeTotalCaloriesByElf(data);

    let totalCalories = 0;
    for (let tier = 0; tier < 3; tier++) {
        const maxCalories = Math.max(...totalCaloriesByElf);
        totalCalories += maxCalories;
        totalCaloriesByElf = totalCaloriesByElf.filter(
            (calories) => calories != maxCalories
        );
    }
    return totalCalories;
}

function main() {
    const data = fs.readFileSync("input.txt", "utf8").toString();

    const elfWithMostCalories = findElfWithMostCalories(data);
    const topThreeElvesWithMostCalories =
        findTopThreeElvesWithMostCalories(data);

    console.log(
        `How many total Calories is that Elf carrying? Answer: ${elfWithMostCalories}`
    );
    console.log(
        `How many Calories are those Elves carrying in total? ${topThreeElvesWithMostCalories}`
    );
}

main();
