import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showOtpInput, setShowOtpInput] = useState(false)

  function handleOtpComponent() {
    setShowOtpInput(true)
  }

  return (
    <>
      <div className='container'>
        <h2>Login via OTP</h2>
        {showOtpInput ? < OTPInput /> : < NumberInput handleOtpComponent={handleOtpComponent} />}
      </div>
    </>
  )
}

function NumberInput({ handleOtpComponent }) {

  return (
    <>
      <input type="number" id='number' placeholder='Enter your mobile number' />
      <input type="submit" onClick={handleOtpComponent} className='submitBtn' value="Send OTP" />
    </>
  )
}

function OTPInput() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    })
    // console.log(inputRef.current);
    if (value !== '' && index < otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  function handleBackspace(index, e) {
    if (e.keyCode === 8 && otp[index] === '' && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }
  return (
    <>
      <div>
        {
          otp.map((digit, index) => (
            <input
              type="text"
              className='otpInput'
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e)}
              ref={(ref) => inputRef.current[index] = ref}
              onKeyDown={(e) => handleBackspace(index, e)}
            />
          ))
        }
      </div>
      <input type="submit" className='submitBtn' value="Login" />
    </>
  )
}

export default App
