import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileComponent from './ProfileComponent'
import { useRecoilState, useRecoilValue } from 'recoil'
import { profileAtom } from './atoms'

function App() {
  const [allProfiles, updateAllProfiles] = useRecoilState(profileAtom);

  useEffect(() => {
    updateAllProfiles((old) => [
      ...old,
      {
        profileUrl: 'https://magiccard.odisha.gov.in/images/nua-o.png',
        name: 'Bob Smith',
        age: 28,
        address: 'London, UK',
        followers: 80000,
        likes: 120000,
        photos: 1800,
      }
    ])
  }, [])

  return (
    allProfiles.map((each) => {
      return <ProfileComponent key={allProfiles.indexOf(each)} profile={each} />
    })
  )
}

export default App
