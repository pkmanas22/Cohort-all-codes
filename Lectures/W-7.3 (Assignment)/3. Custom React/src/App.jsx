import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Step 1: Create an object for React element representing an anchor tag
const anchorElement = {
  type: 'a',
  props: {
    href: 'https://google.com/',
    target: '_blank',
    innerText: 'Click me',
  }
}

// Step 2: Create a function to generate HTML code from the React-like element object
const generateHTML = (element) => {
  const { type, props } = element;
  const attributes = Object.keys(props).map((each) => `${each}="${props[each]}"`).join(' ')
  // console.log(attributes);
  return `<${type} ${attributes}>${props.innerText}</${type}>`;
}

// Step 3: Create a function for custom rendering
const customRender = (element, targetSelector) => {
  const html = generateHTML(element);
  const selector = document.querySelector(targetSelector);

  selector.innerHTML = html;
}

function App() {
  return (
    <>
      {customRender(anchorElement, '#root')}
    </>
  )
}

export default App
