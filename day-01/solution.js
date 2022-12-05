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

function findElfWithMostCalories(data) {
    const caloriesByElf = parseCaloriesRecords(data);
    const totalCaloriesByElf = caloriesByElf.map((calories) =>
        calories.reduce((acc, value) => acc + value, 0)
    );

    return Math.max(...totalCaloriesByElf);
}

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const elfWithMostCalories = findElfWithMostCalories(data);
    console.log(
        `How many total Calories is that Elf carrying? Answer: ${elfWithMostCalories}`
    );
});
