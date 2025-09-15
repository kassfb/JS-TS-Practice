// https://www.codewars.com/kata/517abf86da9663f1d2000003

// Title:
// Convert string to camel case


// Description:
// Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case). The next words should be always capitalized.

// Examples
// "the-stealth-warrior" gets converted to "theStealthWarrior"

// "The_Stealth_Warrior" gets converted to "TheStealthWarrior"

// "The_Stealth-Warrior" gets converted to "TheStealthWarrior"

// Regular Expressions Algorithms Strings

// SOLUTION 1:
export function toCamelCase(str:string):string{
  if (!str) { 
    return str;
  }
  
  const words = str.split(/[_-]/);
  const upperWords = words.map((word, index) => {
    if (index === 0) {
      return word;
    }
    
    return word[0].toUpperCase() + word.substring(1);
  });
  
  return upperWords.join("");
}

// SOLUTION 2:
export function toCamelCase(str:string):string{
  return str.replace(/[-_](.)/g, (_,char)=>char.toUpperCase())
}

// SOLUTION 3:
export function toCamelCase(str:string):string{
  	return str
      .split(/[-_\s]+/)
      .map((word: string, i: number) => i === 0 
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
      )
      .join('');
}
