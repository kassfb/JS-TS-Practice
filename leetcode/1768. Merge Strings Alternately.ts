// https://leetcode.com/problems/merge-strings-alternately/

// You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.
// Return the merged string.

// Example 1:
// Input: word1 = "abc", word2 = "pqr"
// Output: "apbqcr"
// Explanation: The merged string will be merged as so:
// word1:  a   b   c
// word2:    p   q   r
// merged: a p b q c r

// Example 2:
// Input: word1 = "ab", word2 = "pqrs"
// Output: "apbqrs"
// Explanation: Notice that as word2 is longer, "rs" is appended to the end.
// word1:  a   b 
// word2:    p   q   r   s
// merged: a p b q   r   s

// Example 3:
// Input: word1 = "abcd", word2 = "pq"
// Output: "apbqcd"
// Explanation: Notice that as word1 is longer, "cd" is appended to the end.
// word1:  a   b   c   d
// word2:    p   q 
// merged: a p b q c   d

// Constraints:
// 1 <= word1.length, word2.length <= 100
// word1 and word2 consist of lowercase English letters.


// SOLUTION 1:
function mergeAlternately(word1: string, word2: string): string {
    const minLen = Math.min(word1.length, word2.length);
    let merged = '';

    for (let i = 0; i < minLen; i++){
        merged += word1[i] + word2[i];
    }

    if (word1.length > minLen) {
        merged += word1.slice(minLen);
    }

    if (word2.length > minLen) {
        merged += word2.slice(minLen);
    }

    return merged
};



// SOLUTION 2:
function mergeAlternately(word1: string, word2: string): string {
    let response = "";

    for (let i = 0; i < Math.max(word1.length, word2.length); i++){
        if (i < word1.length) response += word1[i];
        if (i < word2.length) response += word2[i];
    }

    return response;
};

// Complexity:
//   Time complexity: O(N). N being the length of the longest of the two words.
//   Space complexity: O(N). N being the length of the longest of the two words.



// SOLUTION 3 (Recursion):
function mergeAlternately(word1: string, word2: string): string {
    if (word1.length <= 0 || word2.length <= 0) return word1.length <= 0 ? word2 : word1;
    return word1[0] + word2[0] + mergeAlternately(word1.slice(1), word2.slice(1));
};

// Complexity
// Time complexity:
// O(n^2) due to string slicing and concatination

// Space complexity:
// O(n) for auxiliary, O(n) total due to string copies
