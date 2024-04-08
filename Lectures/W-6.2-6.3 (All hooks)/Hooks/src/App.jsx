import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UseEffect from './Common Hooks/useEffect';
import TaskUseEffect from './Common Hooks/taskUseEffect';
import UseMemoQuestion from './Common Hooks/useMemo';
import UseCallback from './Common Hooks/useCallback';
import CustomHooks from './Common Hooks/customHooks';
import UseRefExample from './Common Hooks/useRef';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UseRefExample />
      <CustomHooks />
      <UseCallback />
      <UseMemoQuestion />
      <TaskUseEffect />
      <UseEffect />
    </>
  )
}

export default App
