// https://www.codewars.com/kata/525f50e3b73515a6db000b83/typescript

// Title:
// Create Phone Number

// Description:
// Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

// Example
// createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
// The returned format must be correct in order to complete this challenge.

// Don't forget the space after the closing parentheses!

// Arrays Strings Regular Expressions Algorithms

// SOLUTION 1:
export function createPhoneNumber(numbers: number[]): string {
  const part1 = numbers.slice(0, 3).join('');
  const part2 = numbers.slice(3, 6).join('');
  const part3 = numbers.slice(6).join('');
  const phoneNumberMask = `(${part1}) ${part2}-${part3}`;
  return phoneNumberMask;
}

// SOLUTION 1 Refactored:
export function createPhoneNumber(numbers: number[]): string {
  const codeOfCountry = numbers.slice(0,3).join('');
  const middleNumbers = numbers.slice(3,6).join('');
  const lastNumbers = numbers.slice(6,10).join('');
  
  return `(${codeOfCountry}) ${middleNumbers}-${lastNumbers}`
}

// SOLUTION 2:
export function createPhoneNumber(numbers: number[]): string {
  let phoneNumber:string = "(xxx) xxx-xxxx"
  
  for(let i=0; i<numbers.length; i++){
    phoneNumber = phoneNumber.replace("x", numbers[i].toString())
  }
    
  return phoneNumber
}
