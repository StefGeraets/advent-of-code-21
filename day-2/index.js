import { test, real } from "./data.js";

const result = {
  horizontal: 0,
  depth: 0,
}

const directions = (array) => {
  return array.reduce((map, obj) => {
    for (let key in obj) {
      switch (key) {
        case "forward":
          return { 
            horizontal: map.horizontal += obj[key], 
            depth: map.depth + (map.aim * obj[key]), 
            aim: map.aim 
          }
        case "down":
          return { 
            horizontal: map.horizontal, 
            depth: map.depth, 
            aim: map.aim += obj[key]
          }
        case "up":
          return { 
            horizontal: map.horizontal, 
            depth: map.depth,
            aim: map.aim -= obj[key]
          }
        default:
          break;
      }
    }
  }, {
    horizontal: 0,
    depth: 0,
    aim: 0
  })
}

const multiplyObject = (object) => {
  let numbers = Object.values(object);
  return numbers[0] * numbers[1];
}

console.log(directions(real))
console.log(multiplyObject(directions(real)))