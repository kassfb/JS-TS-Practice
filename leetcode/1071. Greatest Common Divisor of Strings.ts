// https://leetcode.com/problems/greatest-common-divisor-of-strings/

// For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).
// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

// Example 1:
// Input: str1 = "ABCABC", str2 = "ABC"
// Output: "ABC"

// Example 2:
// Input: str1 = "ABABAB", str2 = "ABAB"
// Output: "AB"

// Example 3:
// Input: str1 = "LEET", str2 = "CODE"
// Output: ""
 

// Constraints:
// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of English uppercase letters.


// SOLUTION 1 :
function gcdOfStrings(str1: string, str2: string): string {
    if (str1 + str2 !== str2 + str1) {
        return '';
    }
    const GCD = getGCD(str1.length, str2.length);

    return str1.substring(0, GCD);
};

// «В рекурсии: (a, b) → (b, a % b). Остановка — когда второй аргумент 0. Ответ — первый.» 
function getGCD(a: number, b: number): number {
    if (b === 0)  { // если делитель = 0
      return a;     // ответ — делимое
    }

    return getGCD(b, a % b);       // иначе: (делитель, остаток)
}

// Complexity
// Time complexity: O(len(str1)+len(str2))
// Space complexity: O(len(str1)+len(str2))


//   Intuition
// The problem is about finding the largest possible substring that can divide two strings such that both strings are composed by repeatedly concatenating that substring. To solve this, we need to:
// 1. Check if both strings can be constructed by repeating a common substring. This is validated by checking if str1 + str2 is the same as str2 + str1.
// 2. Once validated, the length of the common substring will be the greatest common divisor (GCD) of the lengths of the two strings.
//    This is because the longest substring that can divide both strings evenly will have a length equal to the GCD of the two string lengths.
// 3. The substring with this GCD length will be the solution.

//   Approach
// Validate if both strings can be divided by a common substring:
// First, concatenate the two strings in both possible orders (str1 + str2 and str2 + str1). If the two concatenated strings are not equal, return an empty string since no common substring can divide both strings.

// Find the GCD of the lengths of the two strings:
// Using the Euclidean algorithm, calculate the greatest common divisor (GCD) of the lengths of str1 and str2. This will give us the length of the largest substring that can divide both strings.

// Return the common substring:
// The substring of str1 from the beginning up to the GCD length will be the result.
