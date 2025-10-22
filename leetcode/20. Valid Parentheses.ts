// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// - Open brackets must be closed by the same type of brackets.
// - Open brackets must be closed in the correct order.
// - Every close bracket has a corresponding open bracket of the same type.
 

// Example 1:
// Input: s = "()"
// Output: true

// Example 2:
// Input: s = "()[]{}"
// Output: true

// Example 3:
// Input: s = "(]"
// Output: false

// Example 4:
// Input: s = "([])"
// Output: true

// Example 5:
// Input: s = "([)]"
// Output: false

// Constraints:
// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

// Tags: String, Stack;


// SOLUTION 1:
function isValid(s: string): boolean {
    const parenthesesMap = new Map([
        ["}", "{"],
        [")", "("],
        ["]", "["],
    ]);
    const stack: string[] = [];

    for(const char of s) {
      if (char === '{' || char === '(' || char === '[') {
        stack.push(char);
      } else {
        if (stack.length === 0) {
          return false;
        }
        const openBracket = stack.pop();
        if (openBracket !== parenthesesMap.get(char)) {
          return false;
        }
      }
    }

    return !stack.length;
};


// SOLUTION 2:
// Intuition
// Brackets must be closed in the correct order, which follows a Last-In-First-Out (LIFO) pattern - the most recently opened bracket must be closed first.
// This naturally suggests using a stack data structure to track opening brackets.

// Approach
// Use a stack to track opening brackets as we traverse the string. Create a mapping of closing brackets to their corresponding opening brackets for quick lookup.
// For each character: if it's an opening bracket, push it onto the stack; if it's a closing bracket, check if the stack is empty (invalid - no matching opener) or if the top of the stack matches the expected opening bracket.
// If they match, pop the stack and continue; otherwise, return false. After processing all characters, the stack must be empty for the string to be valid - any remaining opening brackets mean they were never closed.

// Complexity
// Time complexity: O(n) where n is the length of the string
// Space complexity: O(n) for the stack in worst case (all opening brackets)

// Code
const isValid = (s: string): boolean => {
    const openBrackets: string[] = [];
    const bracketPairs: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (const char of s) {
        const isOpenBracket = char === '(' || char === '[' || char === '{';
        
        if (isOpenBracket) {
            openBrackets.push(char);
        } else {
            if (openBrackets.length === 0) {
                return false;
            }
            
            const lastOpenBracket = openBrackets.pop()!;
            const expectedOpenBracket = bracketPairs[char];
            
            if (lastOpenBracket !== expectedOpenBracket) {
                return false;
            }
        }
    }
    
    return openBrackets.length === 0;
};


// SOLUTION 3:
// Intuition
// We can go through the string and look for closing paranthesis and ensure that they match the previous one. If so, we remove both and continue our check.

// Approach
// We first create a Map to store our closing paranthesis (key) and opening brackets (value).
// Then we iterate through the array and check if the current char is a closing paranthesis.
// If we land on an open paranthesis, we add it to the top of a stack.
// Otherwise, if we land on an closed paranthesis, we pop out the top of the stack and compare it to the mapped value of the closed paranthesis.
// If they match, we continue. Otherwise, there is a mismatch and we return false.
// After leaving the for loop, if the length of our stack is 0, then return false.
// Otherwise, there were more open paranthesis than closed ones, and we return false.

// Complexity
// Time complexity: O(n)
// Space complexity: O(n)

// Code
function isValid(s: string): boolean {
    let map = new Map([
        ["}", "{"],
        [")", "("],
        ["]", "["],
    ])

    let stack =  []

    for (let i of s) {
        if (map.has(i)) {
            let pop = stack.pop()
            if (pop !== map.get(i)) {
                return false
            }
        } else {
            stack.push(i)
        }
    }

    return !stack.length
};
