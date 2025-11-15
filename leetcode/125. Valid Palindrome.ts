// https://leetcode.com/problems/valid-palindrome/
// https://neetcode.io/solutions/valid-palindrome

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
  
// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
  
// Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

// Constraints:
// 1 <= s.length <= 2 * 10^5
// s consists only of printable ASCII characters.


// P.S. You should aim for a solution with O(n) time and O(1) space, where n is the length of the input string.

// SOLUTION 1:
// A brute force solution would be to create a copy of the string, reverse it, and then check for equality. This would be an O(n) solution with extra space.
function isPalindrome(s: string): boolean {
    let forwardString = '';
    for (const char of s) {
        if (isAlphanumeric(char)) {
            forwardString += char.toLowerCase();
        }
    }

    return forwardString === [...forwardString].reverse().join('');
};

function isAlphanumeric(char: string): boolean {
    if (
        (char >= 'A' && char <= 'Z') ||
        (char >= 'a' && char <= 'z') ||
        (char >= '0' && char <= '9')
    ) {
        return true;
    } else {
        return false;
    }
}

// Time & Space Complexity
// Time complexity: O(n)
// Space complexity: O(n)


// A palindrome string is a string that is read the same from the start as well as from the end. This means the character at the start should match the character at the end at the same index. We can use the two pointer algorithm to do this efficiently.
// SOLUTION 2:
function isPalindrome(s: string): boolean {
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        while (l < r && !isAlphanumeric(s[l])) {
            l++;
        }
        while (r > l && !isAlphanumeric(s[r])) {
            r--;
        }
        if(s[l].toLowerCase() !== s[r].toLowerCase()) {
            return false;
        }

        l++;
        r--;
    }

    return true;
};

function isAlphanumeric(c: string): boolean {
        return (
            (c >= 'A' && c <= 'Z') ||
            (c >= 'a' && c <= 'z') ||
            (c >= '0' && c <= '9')
        );
}

// Time & Space Complexity
// Time complexity: O(n)
// Space complexity: O(1)
