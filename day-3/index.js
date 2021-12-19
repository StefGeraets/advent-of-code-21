import { test, real } from "./data.js";

const count = (array) => {
  let amounts = [];
  let total = 0;
  array.forEach(num => {
    for (let i in num) {
      if(!amounts[i]) {
        amounts[i] = 0
      }
      amounts[i] += num[i] === '1';
    }
    total++
  });
  return { amounts, total }
}

const gamma = (results) => {
  return parseInt(results.amounts.map((amount) => amount > results.total/2 ? "1" : "0").join(''), 2)
}

const epsilon = (results) => {
  return parseInt(results.amounts.map((amount) => amount > results.total/2 ? "0" : "1").join(''), 2)
}

const part1 = (array) => {
  const result = count(array);
  console.log("Day 3 | Part1 =======")
  console.log("Gamma: ", gamma(result), "Epsilon: ", epsilon(result));
  console.log("outcome: ", gamma(result) * epsilon(result));
}

part1(real)

// PART 2 ========
const getBit = (bits, pos) => {
	let counts = {'0': 0, '1': 0};

	for (const bit of bits) {
		if (++counts[bit[pos]] > bits.length/2) {
			return bit[pos];
		}
	}

	return null
}

const bitCriteria = (bits, type, pos) => {
  const bit = getBit(bits, pos);

  if (bit === null) {
    return type === 'o2' ? '1' : '0';
  }

  if (type === 'co2') {
    return bit === '1' ? '0' : '1'
  }

  return bit;
}

const getRating = (data, type) => {
  let bits = [...data]
  const bitLength = bits[0].length;

  for (let pos = 0; pos < bitLength; pos++) {
    const commonBit = bitCriteria(bits, type, pos);
    bits = bits.filter(bit => {
      return bit[pos] === commonBit;
    })

    if(bits.length === 1) {
      break;
    }
  }

  return parseInt(bits[0], 2)
}

const part2 = (data) => {
  const oxygen = getRating(data, 'o2');
  const carbon = getRating(data, 'co2');

  console.log("Day 3 | Part 2 =======");
  console.log("Oxygen: ", oxygen, "Co2: ", carbon);
  console.log("LifeSupport Rating: ", oxygen * carbon);
}

part2(real);

