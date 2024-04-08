import { useState } from 'react';
import './CreateCard.css'
import axios from 'axios';

export default function CreateCard(props) {

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [interests, setInterests] = useState([])
    const [media, setMedia] = useState([])

    async function createCardFunction() {
        const newData = {
            name: name,
            desc: desc,
            interestList: interests,
            socialMedia: {
                github: media.github,
                twitter: media.twitter,
                linkedin: media.linkedin,
                portfolio: media.portfolio,
            }
        }

        try {
            const response = await axios.post('http://localhost:3000/createcard', newData);
            alert(response.data.msg);
            // console.log(response);
        } catch (error) {
            let errMsg = "";
            if (error.response) {
                const jsonData = error.response.data.errors;
                console.log(jsonData);
                if (jsonData.name) {
                    errMsg += "Name must be minimum of 2 characters \n"
                }
                if (jsonData.desc) {
                    errMsg += "Description must be minimum of 5 characters \n"
                }
                if (jsonData.interestList) {
                    errMsg += "At least one field is filled in interest list  \n"
                }
                
                if (jsonData.socialMedia,github) {
                    // alert("hifidfji")
                    errMsg += "Github link is mandatory \n"
                }

                alert(errMsg);
            } else if (error.request) {
                // The request was made but no response was received
                alert("Error: No response received from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                alert("Error: " + error.message);
            }
        }
    }

    return (
        <div className="cardForm">
            <div className="nameDiv">
                <label htmlFor="name">
                    Name : <input onChange={(e) => {
                        setName(e.target.value)
                    }} type="text" id="name" placeholder="Your name" />
                </label>
            </div>

            <div className="descDiv">
                <label htmlFor="desc">
                    Description : <input onChange={(e) => {
                        setDesc(e.target.value)
                    }} type="text" id="desc" placeholder="Description" />
                </label>
            </div>

            <fieldset className="interests">
                <legend>Interests <span>(At least fill one field)</span></legend>

                {
                    [1, 2, 3, 4, 5, 6].map((index) => (
                        <>
                            <input onChange={(e) => {
                                const updateInterests = [...interests];
                                updateInterests[index - 1] = e.target.value;
                                setInterests(updateInterests);
                            }}
                                type="text"
                                placeholder={`Interest ${index}`}
                            />
                        </>

                    ))
                }
            </fieldset>

            <fieldset className='socialMedia'>
                <legend> Social Media  <span>(Github is mandatory)</span></legend>

                {
                    ["github", "twitter", "linkedin", "portfolio"].map((each, index) => (
                        <>
                            <label htmlFor={each}>
                                {each.charAt(0).toUpperCase() + each.slice(1)} :
                                <input onChange={(e) => {
                                    const updatedMedia = { ...media };
                                    updatedMedia[each] = e.target.value;
                                    setMedia(updatedMedia);
                                }}
                                    type="url"
                                    id={each}
                                    placeholder={"https://" + each + ".com/"} />
                            </label>
                            <br />
                        </>
                    ))
                }
            </fieldset>

            <div className='submitBtn'>
                <button onClick={createCardFunction}>Create Card</button>
            </div>
        </div>
    )
}
