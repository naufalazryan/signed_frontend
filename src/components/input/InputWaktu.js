import React from 'react';

 const InputWaktu = () => {
  return (
    <div>
      <label htmlFor='waktu' className='block text-sm font-medium text-gray-700'>
        Waktu
      </label>
      <input
        id='waktu'
        className='mt-2 bg-input p-[17px] shadow-inner w-full h-11 rounded-md'
        type='time'
        placeholder='Isi Waktu'
      />
    </div>
  );
}

export default InputWaktu
