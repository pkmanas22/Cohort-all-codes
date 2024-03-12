/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let strArr = str.toLowerCase().split('');
  let count = 0;
  strArr.forEach(char => {
    if (char == 'a' || char == 'e' || char == 'i' || char == 'o' || char == 'u') {
      count ++;
    }
  });
  return count;
}

// console.log(countVowels("mAOas"));

module.exports = countVowels;