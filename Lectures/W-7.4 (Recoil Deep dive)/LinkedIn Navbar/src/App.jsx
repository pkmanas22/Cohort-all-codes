
import './App.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { jobsAtom, messagingAtom, networkAtom, notificationAtom, totalNotificationSelector } from './atoms'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const networkCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const messagingCount = useRecoilValue(messagingAtom);
  const notificationCount = useRecoilValue(notificationAtom);

  // using useMemo hook
  /*  const totalCount = useMemo(() => {
      return networkCount + jobsCount + messagingCount + notificationCount
    }, [networkCount, jobsCount, messagingCount, notificationCount])
  */

  // using selector       --> better approach
  const totalCount = useRecoilValue(totalNotificationSelector)

  function checkForConversion(count) {
    return (count > 99) ? "99+" : count
  }

  return (
    <>
      <button>Home</button>
      <button>My network ({checkForConversion(networkCount)})</button>
      <button>Jobs ({checkForConversion(jobsCount)})</button>
      <button>Messaging ({checkForConversion(messagingCount)})</button>
      <button>Notification ({checkForConversion(notificationCount)})</button>
      <button>Me ({totalCount})</button>
    </>
  )
}

export default App
