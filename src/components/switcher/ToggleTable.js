import React, { useState } from 'react'

const ToggleTable = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label htmlFor='checkbox'>
        <div className='relative cursor-pointer select-none items-center gap-3'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
            id='checkbox'
          />
          <div
            className={`box block h-5 w-8 rounded-full ${
              isChecked ? 'bg-merah' : 'bg-input shadow-inner-3'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white transition duration-300 ${
              isChecked ? 'translate-x-full transition' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  )
}

export default ToggleTable
