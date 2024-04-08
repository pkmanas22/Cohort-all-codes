/* eslint-disable react/jsx-key */
import './Card.css'

export default function Card({ allCards }) {
    // console.log(allCards);
    const sortedCard = allCards.slice().reverse()
    return (
        <>
            {sortedCard.map((card) => {
                return (
                    <div className="card">
                        <div className="each-card">
                            <div className="additional">
                                <div className="nameDiv">
                                    Business Name
                                </div>
                                <div className='imgDiv'>
                                    <img src="../public/vite.svg" alt="" />
                                </div>
                            </div>
                            <div className="content">
                                <div><h1>{card.name}</h1></div>
                                <div><p>{card.desc}</p></div>
                                <div>
                                    <h3>Interests</h3>
                                    <div className="interestLists">
                                        {card.interestList.map((each) => {
                                            return <li>{each}</li>
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <h3>Connect with me</h3>
                                    <div className="social-media">
                                        {
                                            Object.entries(card.socialMedia).map(([platform, url]) => {
                                                // console.log(`${platform}: ${url}`);
                                                return <a href={url} target='_blank'>{platform}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}