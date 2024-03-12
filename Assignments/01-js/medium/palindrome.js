/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let strArr = str.toLowerCase().split('');
  let n = strArr.length;
  for (let i = 0; i < n / 2; i++) {
    if (strArr[i] !== strArr[n-1-i]) {
      return false;
    }
  }
  return true;
}

// console.log(isPalindrome("Able, was I ere I saw Elba!"));

module.exports = isPalindrome;
