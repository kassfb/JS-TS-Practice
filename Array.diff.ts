// https://www.codewars.com/kata/523f5d21c841566fde000009/typescript

// Title:
// Array.diff

// Description:
// Implement a function that computes the difference between two lists. The function should remove all occurrences of elements from the first list (a) that are present in the second list (b). The order of elements in the first list should be preserved in the result.

// Examples
// If a = [1, 2] and b = [1], the result should be [2].

// If a = [1, 2, 2, 2, 3] and b = [2], the result should be [1, 3].

// Arrays Fundamentals Algorithms

// SOLUTION 1:
export function arrayDiff(a: number[], b: number[]): number[] {
  if (!a.length || !b.length) {
    return a;
  }
  const res = [];
  for (let i = 0; i < a.length; i++) {
    let bothContain = false;
    for (let j = 0; j < b.length; j++) {
      if (a[i] === b[j]) {
        bothContain = true;
        continue;
      }
    }
    if (!bothContain) {
      res.push(a[i]);
    }
  }
  
  return res;
}

// SOLUTION 2:
export function arrayDiff(a: number[], b: number[]): number[] {
  return a.filter(e => !b.includes(e));
}

// SOLUTION 3:
export function arrayDiff(a: number[], b: number[]): number[] {
  const bSet = new Set(b);
  return a.filter( value => !bSet.has(value) );
}
