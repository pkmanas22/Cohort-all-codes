import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from '../components/Card'
import CreateCard from '../components/CreateCard'

function App() {
    const [cards, setCards] = useState([])

    fetch('http://localhost:3000/allcards')
        .then(async (response) => {
            const jsonData = await response.json()
            setCards(jsonData.allCards);
            // console.log(jsonData.allCards);
        })


    return (
        <>
            <div className="finalDiv">
                <div className="createCard">
                    <CreateCard />
                </div>
                <div className="cardList">
                    < Card allCards={cards} />
                </div>
            </div>
        </>
    )
}

export default App
