
import './App.css'
import UseEffect from './Hooks/UseEffectInternal'

import UseState from './Hooks/UseStateInternal'
import UseTodosCreation from './Hooks/MyCustomDataFetchingHooks'
import SWRDataFetching from './Hooks/SWRDataFetching'
import UseIsOnlineCustomHook from './Hooks/UseIsOnline'
import UseMousePointerHook from './Hooks/UseMousePointer'
import UseScreenSizeHook from './Hooks/UseScreenSize'
import UseIntervalHook from './Hooks/UseIntervalHook'
import { UseDebouncingHook } from './Hooks/UseDebouncing'

function App() {

  return (
    <>
      < UseDebouncingHook />
      < UseIntervalHook />
      < UseScreenSizeHook />
      < UseMousePointerHook />
      < UseIsOnlineCustomHook />
      < SWRDataFetching />
      < UseState />
      < UseEffect />
      < UseTodosCreation />
    </>
  )
}



export default App
