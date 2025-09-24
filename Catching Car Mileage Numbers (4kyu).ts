// https://www.codewars.com/kata/52c4dd683bfd3b434c000292

// Description:
// "7777...8?!??!", exclaimed Bob, "I missed it again! Argh!" Every time there's an interesting number coming up, he notices and then promptly forgets. Who doesn't like catching those one-off interesting mileage numbers?

// Let's make it so Bob never misses another interesting number. We've hacked into his car's computer, and we have a box hooked up that reads mileage numbers. We've got a box glued to his dash that lights up yellow or green depending on whether it receives a 1 or a 2 (respectively).

// It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.

// Note: In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.

// "Interesting" Numbers
// Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:

// Any digit followed by all zeros: 100, 90000
// Every digit is the same number: 1111
// The digits are sequential, incementing†: 1234
// The digits are sequential, decrementing‡: 4321
// The digits are a palindrome: 1221 or 73837
// The digits match one of the values in the awesomePhrases array
// † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
// ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

// So, you should expect these inputs and outputs:

// // "boring" numbers
// isInteresting(3, [1337, 256]);    // 0
// isInteresting(3236, [1337, 256]); // 0

// // progress as we near an "interesting" number
// isInteresting(11207, []); // 0
// isInteresting(11208, []); // 0
// isInteresting(11209, []); // 1
// isInteresting(11210, []); // 1
// isInteresting(11211, []); // 2

// // nearing a provided "awesome phrase"
// isInteresting(1335, [1337, 256]); // 1
// isInteresting(1336, [1337, 256]); // 1
// isInteresting(1337, [1337, 256]); // 2
// Error Checking
// A number is only interesting if it is greater than 99!
// Input will always be an integer greater than 0, and less than 1,000,000,000.
// The awesomePhrases array will always be provided, and will always be an array, but may be empty. (Not everyone thinks numbers spell funny words...)
// You should only ever output 0, 1, or 2.
// Algorithms

// SOLUTION 1:
export function isInteresting(n: number, awesomePhrases: number[]): number {
  const range = 2;
  const leftRangeLimit = n - range;
  const rightRangeLimit = n + range;
  let interestingRange = [];
  for (let i = leftRangeLimit; i <= rightRangeLimit; i++) {
    interestingRange.push(i);
  }
  
  // A number is only interesting if it is greater than 99!
  const isNumerInteresting = n > 99;
  interestingRange = interestingRange.filter(value => value > 99);
  const isRangeInteresting = interestingRange.length > 0;

  // Any digit followed by all zeros: 100, 90000
  const anyDigitFollowedByAllZeros = /^[1-9]0*$/;
  // Every digit is the same number: 1111
  const everyDigitIsTheSameNumber = /^(\d)\1*$/
  
  if(isNumerInteresting) {
    // Any digit followed by all zeros: 100, 90000
    if (anyDigitFollowedByAllZeros.test(n.toString())) {
      return 2;
    }
    // Every digit is the same number: 1111
    if (everyDigitIsTheSameNumber.test(n.toString())) {
      return 2;
    }
    // The digits are sequential
    if (isSequential(n)) {
      return 2;
    }
    // The digits are a palindrome: 1221 or 73837
    if (isPalindrome(n)) {
      return 2;
    }
    // The digits match one of the values in the awesomePhrases array
    if (awesomePhrases.some(value => value === n)) {
      return 2;
    }
  }
  
  if(isRangeInteresting) {
    // Any digit followed by all zeros: 100, 90000
    if (interestingRange.some(value => anyDigitFollowedByAllZeros.test(value.toString()))) {
        return 1;
    }
    // Every digit is the same number: 1111
    if (interestingRange.some(value => everyDigitIsTheSameNumber.test(value.toString()))) {
        return 1;
    }
    // The digits are sequential
    if (interestingRange.some(value => isSequential(value))) {
      return 1;
    }
    // The digits are a palindrome: 1221 or 73837
    if (interestingRange.some(value => isPalindrome(value))) {
      return 1;
    }
    // The digits match one of the values in the awesomePhrases array
    if (interestingRange.some(value => awesomePhrases.includes(value))) {
      return 1;
    }
  }
  
  return 0;
}

function isPalindrome(num: number): boolean {
  const str = String(num);
  return str === str.split('').reverse().join('');
}

function isSequential(num: number): boolean {
  const str = String(num);
  const len = str.length;
  const digits = Array.from(str, c => parseInt(c, 10));

  const isInc = () => {
    for (let i = 1; i < len; i++) {
      const expected = (digits[i - 1] + 1) % 10;
      if (digits[i] !== expected) {
        return false;
      }
      if (digits[i] === 0 && i !== len - 1) {
        return false;
      }
    }
    return true;
  };

  const isDec = () => {
    for (let i = 1; i < len; i++) {
      const expected = digits[i - 1] - 1;
      if (digits[i] !== expected) {
        return false;
      }
      if (digits[i] === 0 && i !== len - 1) {
        return false;
      }
    }
    return true;
  };

  return isInc() || isDec();
}

// SOLUTION 2:
export function isInteresting(n: number, awesomePhrases: number[]): number {
  if (checkNumber(n, awesomePhrases)) {
    return 2;
  }
  
  if (checkNumber(n + 1, awesomePhrases) || checkNumber(n + 2, awesomePhrases)) {
    return 1;
  }

  return 0;
}

function checkNumber(n: number, awesomePhrases: number[]): boolean {
  return `${n}`.length > 2 && (
    isNumberFollowedByZeros(n) || 
    areAllDigitEqual(n) || 
    areDigitsSequentialAndIncreamenting(n) || 
    areDigitsSequentialAndDecreamenting(n) || 
    isPalindrome(n) || 
    isAwesomeNumber(n, awesomePhrases)
  );
}

function isNumberFollowedByZeros(n: number): boolean {
  const match = `${n}`.match(/^\d0*$/);
  return match !== null;
}

function areAllDigitEqual(n: number): boolean {
  return new Set([...`${n}`]).size === 1;
}

function areDigitsSequentialAndIncreamenting(n: number): boolean {
  return `01234567890`.includes(`${n}`);
}

function areDigitsSequentialAndDecreamenting(n: number): boolean {
  return `9876543210`.includes(`${n}`);
}

function isPalindrome(n: number): boolean {
  return `${n}` === [...`${n}`].reverse().join("");
}

function isAwesomeNumber(n: number, awesome: number[]): boolean {
  return awesome.includes(n);
}
