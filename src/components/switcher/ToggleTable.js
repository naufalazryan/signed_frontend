import React, { useState, useEffect } from 'react';

const ToggleTable = ({ id, initialValue, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleCheckboxChange = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    onToggle(newStatus);
  };

  useEffect(() => {
    setIsChecked(initialValue);
  }, [initialValue]);

  return (
    <>
      <label htmlFor={id}>
        <div className='relative cursor-pointer select-none items-center gap-3'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
            id={id}
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
  );
};

export default ToggleTable;
