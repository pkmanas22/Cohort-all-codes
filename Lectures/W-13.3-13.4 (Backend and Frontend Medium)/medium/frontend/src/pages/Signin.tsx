
import { BlockquoteComponent } from '../components/BlockquoteComponent'
import { SignInComp } from '../components/SignInComp'

export const Signin = () => {
  return (
    <div className='w-screen h-screen grid md:grid-cols-2'>

      <div className="flex justify-center items-center">
        < SignInComp />
      </div>

      <div className="bg-gray-400 px-6 md:px-20 flex-col items-center justify-center font-bold md:text-xl hidden md:inline-flex">
        < BlockquoteComponent />
      </div>
    </div>
  )
}
