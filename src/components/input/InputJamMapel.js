import React from 'react'

const InputJamMapel = () => {
  return (
    <div>
      <label htmlFor='jam_pelajaran'  className='block text-sm font-medium text-gray-700'>
        Jam Pelajaran
      </label>
      <input className='mt-2 bg-input p-[17px] shadow-inner  w-full h-11 rounded-md' id='jam_pelajaran' name='jam_pelajaran' type='number' placeholder='Isi Jam Pelajaran' />
    </div>
  )
}

export default InputJamMapel