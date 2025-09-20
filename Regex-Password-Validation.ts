// https://www.codewars.com/kata/52e1476c8147a7547a000811/typescript

// Title:
// Regex Password Validation

// Description:
// You need to write regex that will validate a password to make sure it meets the following criteria:

// At least six characters long
// contains a lowercase letter
// contains an uppercase letter
// contains a digit
// only contains alphanumeric characters (note that '_' is not alphanumeric)

// Regular Expressions Fundamentals

// SOLUTION 1:
export const REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;

// Разбор по частям:
// ^ — начало строки.
// (?= ) — lookahead.
// (?=.*[a-z]) — где-то есть строчная буква.
// (?=.*[A-Z]) — где-то есть заглавная буква.
// (?=.*\d) — где-то есть цифра.
// [a-zA-Z0-9]{6,} — вся строка состоит только из латинских букв и цифр, минимум 6 символов.
// $ — конец строки.
