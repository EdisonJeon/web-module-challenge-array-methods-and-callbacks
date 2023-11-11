const { fifaData } = require("./fifa.js");

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
const example = fifaData.filter((input) => {
  return input.Year === 2014 && input.Stage === "Final";
});

//(a) Home Team name for 2014 world cup final
console.log("@@@@@@ TESTING @@@@@@ =>", example[0]["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log(example[0]["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log(example[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log(example[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log(example[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(arr) {
  return arr.filter((input) => {
    return input.Stage === "Final";
  });
}

getFinals(fifaData);
console.log("@@@@@@ GETTING FINALS DATA @@@@@@ =>", getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, cbGetFinals) {
  return cbGetFinals(arr).map((input) => {
    return input.Year;
  });
}

getYears(fifaData, getFinals);
console.log(getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(arr, cbGetFinals) {
  return cbGetFinals(arr).map((input) => {
    if (input["Home Team Goals"] > input["Away Team Goals"]) {
      return input["Home Team Name"];
    } else if (input["Away Team Goals"] > input["Home Team Goals"]) {
      return input["Away Team Name"];
    } else {
      // placeholder
      if (input["Win conditions"].indexOf(input["Home Team Name"])) {
        return input["Home Team Name"];
      } else {
        return input["Away Team Name"];
      }
    }
  });
}

getWinners(fifaData, getFinals);
console.log(getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, cbGetFinals, cbGetYears, cbGetWinners) {
  const newArr = [];
  for (let i = 0; i < cbGetFinals(arr).length; i++) {
    newArr.push(
      `In ${cbGetYears(arr, cbGetFinals)[i]}, ${
        cbGetWinners(arr, cbGetFinals)[i]
      } won the world cup!`
    );
  }
  return newArr;
}

getWinnersByYear(fifaData, getFinals, getYears, getWinners);
console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(cbGetFinals) {
  //   return cbGetFinals[0]["Home Team Goals"];
  const avg = cbGetFinals.reduce((total, input) => {
    let sum = total + input["Home Team Goals"] + input["Away Team Goals"];
    return sum;
  }, 0);
  const finalAvg = avg / cbGetFinals.length;
  return finalAvg.toFixed(2);
}

getAverageGoals(getFinals(fifaData));
console.log(getAverageGoals(getFinals(fifaData)));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    return getFinals(data)
}

getCountryWins(fifaData, "NED")
console.log(getCountryWins(fifaData, "NED"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
foo();
module.exports = {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};
