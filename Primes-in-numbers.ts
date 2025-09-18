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
