import React, { useState } from 'react'

const ToggleGambar = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label htmlFor='checkbox' className='cursor-pointer select-none items-center gap-3  font-medium'>
      Status
        <div className='relative mt-2'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
            id='checkbox'
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? 'bg-merah' : 'bg-input shadow-inner-3'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition duration-300 ${
              isChecked ? 'translate-x-full transition' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  )
}

export default ToggleGambar
