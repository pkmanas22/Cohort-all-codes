/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    let str1Arr = str1.toLowerCase().split("").sort().join('');
    let str2Arr = str2.toLowerCase().split("").sort().join('');
    // console.log(str1Arr);
    // console.log(str2Arr);
    return str1Arr === str2Arr;
}
module.exports = isAnagram;
// console.log(isAnagram('Debit Card', 'Bad Credit'));
