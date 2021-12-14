import { test, real } from "./data.js";

const sum = (array) => {
  return array.map((value, index, arr) => {
    if (arr[index + 1] === "undefined" || arr[index + 2] === undefined) {
      return
    }
    return arr[index] + arr[index + 1] + arr[index + 2]
  })
}

const compare = (array) => {
  return array.reduce((a, b, index, arr) => {
    if (b === undefined) {
      return a
    }

    if (arr[index] < arr[index + 1]) {
      return a + 1
    }

    return a
  }, 0)
}

console.log("result compare", compare(real));
console.log("result sum compare", compare(sum(real)));
