import { test, real } from './numbers.js';
import * as fs from 'fs';

const testFile = fs.readFileSync('./test.txt').toString().split('\n');
const realFile = fs.readFileSync('./boards.txt').toString().split('\n');

const generateBoards = (data) => {
  const boards = [];
  let board = [];

  for (const i in data) {
    if (data[i] === '') {
      board = [];
      boards.push(board)
    } else {
      const line = data[i].trim().split(/\s+/).map(n => parseInt(n, 10))
      board.push(line);
    }
  }

  return boards;
}

const checkBoardWinCondition = (board, numbers) => {
  const size = board[0].length;
  const hits = new Array(size * 2).fill(0);
  
  let win = false;
  let notHitSum = 0;
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (numbers.includes(board[i][j])) {
        if(++hits[i] === size || ++hits[j+size] === size) {
          win = true
        }
      } else {
        notHitSum += board[i][j];
      }
    }
  }

  if (win) {
    console.log("check win", board, numbers);
  }
  
  return [win, notHitSum]
}

const bingo = (numbers, boards) => {
  for (let number = 0; number < numbers.length; number++) {
    for (let board = 0; board < boards.length; board++) {
       if (!boards[board]) {
         continue;
       }

       const [win, notHitSum] = checkBoardWinCondition(boards[board], numbers.slice(0, number));

       if (win) {
         console.log(`board ${board + 1} won! score: `, notHitSum * numbers[number - 1]);
         boards[board] = null;
        //  return; // Get first winning board
       }
    }
  }
}


console.log(bingo(real, generateBoards(realFile)));
