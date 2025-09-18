// https://www.codewars.com/kata/54d512e62a5e54c96200019e/typescript

// Title:
// Primes in number

// Description:
// Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :

//  "(p1**n1)(p2**n2)...(pk**nk)"
// with the p(i) in increasing order and n(i) empty if n(i) is 1.

// Example: n = 86240 should return "(2**5)(5)(7**2)(11)"
// Mathematics


// SOLUTION 1:
export const primeFactors = (n:number): string => {
  if (!n || n < 2) {
    return n.toString();
  }
  
  const factors = [];
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }

  return getPrimeFactorDecomposition(factors);
};

function getPrimeFactorDecomposition(factors: number[]): string {
  let factorsString = '';
  const result = factors.reduce((acc: {value: number, occurrencesCount: number}, cur) => {
    if (acc.value === cur) {
      acc.occurrencesCount++;
      return acc;
    }
    
    if (acc.occurrencesCount > 1) {
      factorsString += `(${acc.value}**${acc.occurrencesCount})`;
    } else {
      factorsString += `(${acc.value})`;
    }
    acc.value = cur;
    acc.occurrencesCount = 1;
    return acc;
    
  }, {value: factors[0], occurrencesCount: 0});
  
  if (result.occurrencesCount > 1) {
    factorsString += `(${result.value}**${result.occurrencesCount})`;
  } else {
    factorsString += `(${result.value})`;
  }

  return factorsString;
}


// SOLUTION 2:
export const primeFactors = (n:number): string => {
  let result = '';
  let prime = 2;
  while(n > 1) {
    let count = 0;
    while(n % prime === 0) {
      n /= prime;
      count++;
    }
    if(count) result += `(${prime}${count > 1 ? `**${count}` : ``})`;
    prime++;
  }
  return result;
}


// SOLUTION 3:
export const primeFactors = (n:number): string => {
  const factors: number[] = findFactors(n);
  const counts: Map<number, number> = getCounts(factors);
  let output = "";
  
  for (const count of counts) {
    const key: number = count[0];
    const value: number = count[1];
    output = output.concat(value === 1 ? `(${key})` : `(${key}**${value})`);
  }
  
  return output;
}

const getCounts = (nums: number[]): Map<number, number> => {
  const counts: Map<number, number> = new Map();

  for (const num of nums) {
    const count = counts.get(num);
    counts.set(num, count === undefined ? 1 : count + 1);
  }
  
  return counts;
}

const findFactors = (n: number): number[] => {
  let factors: number[] = [];
  for (let i: number = 0; i <= n; ++i) {
    if (isFactor(n, i) && isPrime(i)) {
      factors.push(i);
      n /= i;
      i = 0;
    }
  }
  return factors;
} 

const isFactor = (dividend: number, divisor: number): boolean => {
  return dividend % divisor === 0;
}
  
const isPrime = (num: number): boolean => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
      if(num % i === 0) return false; 
  return num > 1;
}
