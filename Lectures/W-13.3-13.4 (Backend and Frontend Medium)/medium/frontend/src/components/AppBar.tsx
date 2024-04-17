
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from './ButtonComponent'
import { useEffect, useState } from 'react';
import DropDown from './DropDown';

export const AppBar = ({ loggedIn, name }: { loggedIn: boolean, name: string }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState('');
  const [dropDownVisible, setDropDownVisible] = useState(false);

  useEffect(() => {
    setVisible(loggedIn ? "visible" : "hidden")
  }, [loggedIn]);

  function toggleDropDown() {
    setDropDownVisible(!dropDownVisible);
    console.log(dropDownVisible);
  }

  return (
    <>
      <div className='px-6 py-2 flex  justify-between items-center border-b-2 shadow-md'>
        <div
          onClick={() => {
            navigate('/')
          }}
          className='text-xl font-bold italic cursor-pointer'>
          BlogVista
        </div>
        <div className='flex gap-2 pr-2 items-center'>

          <div className='text-lg font-semibold italic outline outline-2 px-4 rounded-xl outline-slate-400 cursor-pointer hover:bg-slate-100'
            onClick={() => {
              navigate(loggedIn ? '/new' : '/signin')
            }} >
            Write
          </div>

          {!loggedIn && (
            <>
              < ButtonComponent
                visibility={!loggedIn}
                label={"Sign up"}
                bgColour={"bg-green-600"}
                onClickFn={() => {
                  navigate('/signup')
                }} />

              < ButtonComponent
                visibility={!loggedIn}
                label={"Sign in"}
                bgColour={"bg-lime-600"}
                onClickFn={() => {
                  navigate('/signin')
                }} />
            </>
          )}

          <div onClick={toggleDropDown} className={`${visible} relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer`}>
            <span

              className="font-bold text-gray-600 ">
              {name ? name.charAt(0).toUpperCase() : <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>}
            </span>
          </div>
        </div>
      </div>

      {dropDownVisible && (
        < DropDown />
      )}
    </>
  )
}

