import React, { useState } from 'react';

const ToggleStatus = ({ defaultValue = 0, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultValue === 1);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    // Mengirimkan nilai 1 jika tombol diaktifkan (on), dan 0 jika tombol dinonaktifkan (off)
    const valueToSend = newValue ? 1 : 0;
    onChange && onChange(valueToSend);
  };

  return (
    <>
      <label htmlFor='checkbox' className='cursor-pointer select-none items-center gap-3 text-sm font-medium text-gray-700'>
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
  );
};

export default ToggleStatus;