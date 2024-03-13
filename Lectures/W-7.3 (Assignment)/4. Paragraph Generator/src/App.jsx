import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [words, setWords] = useState();
  const [para, setPara] = useState('');

  const wordsArr = ['cat', 'dog', 'house', 'car', 'tree', 'book', 'computer', 'mountain', 'beach', 'sun'];

  function generateParagraph() {
    if (!words || isNaN(words) || words <= 0) {
      alert("Please enter a valid positive number of words.");
      return;
    }

    let sentence = '';
    for (let i = 0; i < words; i++) {
      const randomNum = Math.floor(Math.random() * wordsArr.length);
      sentence += wordsArr[randomNum] + " ";
    }

    setPara(sentence.trim());
  }

  return (
    <>
      <h1>Paragraph Generator</h1>
      <div>
        <input
          type="number"
          value={words}
          onChange={(e) => setWords(e.target.value)}
          placeholder="Enter number of words"
        />
        <button onClick={generateParagraph}>Generate</button>
      </div>
      <div>{para}</div>
    </>
  );
}

/*function App() {
  const [words, setWords] = useState();
  const [para, setPara] = useState('');


  useEffect(() => {
    const wordsArr = ['cat', 'dog', 'house', 'car', 'tree', 'book', 'computer', 'mountain', 'beach', 'sun'];

    function generateParagraph() {
      if (words <= 0) {
        alert("Should be greater than 0")
      }

      let sentence = '';
      for (let i = 0; i < words; i++) {
        const randomNum = Math.floor(Math.random() * wordsArr.length)
        sentence += wordsArr[randomNum] + " "
      }

      setPara(sentence.trim())
    }

    generateParagraph()
  }, [words])

  return (
    <>
      <h1>Paragraph Generator</h1>
      <div>
        <input type="number" onChange={(e) => { setWords(e.target.value) }} placeholder='Enter number of words' />
        <button >Generate</button>
      </div>
      <div>{para}</div>
    </>
  )
}*/

export default App
