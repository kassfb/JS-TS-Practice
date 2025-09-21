// https://www.codewars.com/kata/556deca17c58da83c00002db/typescript

// Title:
// Tribonacci Sequence

// Description:
// Well met with Fibonacci bigger brother, AKA Tribonacci.

// As the name may already reveal, it works basically like a Fibonacci, but summing the last 3 (instead of 2) numbers of the sequence to generate the next. And, worse part of it, regrettably I won't get to hear non-native Italian speakers trying to pronounce it :(

// So, if we are to start our Tribonacci sequence with [1, 1, 1] as a starting input (AKA signature), we have this sequence:

// [1, 1 ,1, 3, 5, 9, 17, 31, ...]
// But what if we started with [0, 0, 1] as a signature? As starting with [0, 1] instead of [1, 1] basically shifts the common Fibonacci sequence by once place, you may be tempted to think that we would get the same sequence shifted by 2 places, but that is not the case and we would get:

// [0, 0, 1, 1, 2, 4, 7, 13, 24, ...]
// Well, you may have guessed it by now, but to be clear: you need to create a fibonacci function that given a signature array/list, returns the first n elements - signature included of the so seeded sequence.

// Signature will always contain 3 numbers; n will always be a non-negative number; if n == 0, then return an empty array (except in C return NULL) and be ready for anything else which is not clearly specified ;)

// If you enjoyed this kata more advanced and generalized version of it can be found in the Xbonacci kata

// [Personal thanks to Professor Jim Fowler on Coursera for his awesome classes that I really recommend to any math enthusiast and for showing me this mathematical curiosity too with his usual contagious passion :)]

// Number Theory Arrays Lists Fundamentals

// SOLUTION 1:
export function tribonacci(sig: [number, number, number], n: number): number[] {
  const tribonacciSequence: number[] = [];
  for (let i = 0; i < n; i++) {
    if (i < 3) {
      tribonacciSequence.push(sig[i]);
    } else {
      tribonacciSequence.push(tribonacciSequence[i - 1] + tribonacciSequence[i - 2] + tribonacciSequence[i - 3]);
    }
  }

  return tribonacciSequence;
}

// = the same =
export function tribonacci(sig: [number, number, number], n: number): number[] {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [sig[0]];
  }
  if (n === 2) {
    return [sig[0], sig[1]];
  }
  if (n === 3) {
    return sig;
  }
  
  const tribonacciSequence = [...sig];
  for (let i = 0; i < n - 3; i++) {
    const tribonacciNextValue = tribonacciSequence[tribonacciSequence.length - 3] + tribonacciSequence[tribonacciSequence.length - 2] + tribonacciSequence[tribonacciSequence.length - 1];
    tribonacciSequence.push(tribonacciNextValue);
  }
  return tribonacciSequence;
}


// SOLUTION 2:
export function tribonacci(s: Array<number>, n: number): number[] {
  for (let i = 0; s.length < n; i++) s.push(s[i] + s[i + 1] + s[i + 2]);
  return s.slice(0,n);
}
// = the same =
export function tribonacci([a, b, c]: [number, number, number], n: number): number[] {
  const sequence: number[] = [a, b, c];
  for (let i = 3; i < n; i++) {
    const next = sequence[i-3] + sequence[i-2] + sequence [i-1];
    sequence.push(next);
  }
  return sequence.slice(0, n);
}
