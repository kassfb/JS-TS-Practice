// https://www.codewars.com/kata/591b3ca0e0f838dfea0000bf/javascript

// Description:
// You will be given an array arr representing a tree, which has nested arrays, which might have nest arrays in them, which... well, you get the idea. You need to quantify how deep these arrays go by calculating these numbers:

// min: minimum deepness
// max: maximum deepness
// mean: average deepness
// and return the result as an object: {min: something, max: something, mean: something}. Please return an object with keys in this exact order, and round the mean to 3 decimal places.

// Deepness is quantified by all the leaves (i.e elements that are not arrays) of the tree.

// It is guaranteed that the initial array will always be an array, and there will never be any circular references.

// Fundamentals Data Structures Trees

// SOLUTION 1:
function arrayDeepness(arr) {
  const depths = [];
  getArrayDeepness(arr, 0, depths);

  const min = Math.min(...depths);
  const max = Math.max(...depths);
  const sum = depths.reduce((a, b) => a + b, 0);
  const mean = +(sum / depths.length).toFixed(3);
  
  return { min, max, mean };
}

function getArrayDeepness(item, currentDepth, depths) {
  if (Array.isArray(item)) {
    for (let i = 0; i < item.length; i++) {
        getArrayDeepness(item[i], currentDepth + 1, depths);
      }
  } else {
    depths.push(currentDepth);
  }
}

// SOLUTION 2 (Closure):
function arrayDeepness(arr) {
  const depths = [];

  function traverse(item, currentDepth) {
    if (Array.isArray(item)) {
      item.forEach(subItem => traverse(subItem, currentDepth + 1));
    } else {
      depths.push(currentDepth);
    }
  }

  traverse(arr, 0);

  const min = Math.min(...depths);
  const max = Math.max(...depths);
  const sum = depths.reduce((a, b) => a + b, 0);
  const mean = +(sum / depths.length).toFixed(3);

  return { min, max, mean };
}
