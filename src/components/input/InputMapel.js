import React from 'react'

const InputMapel = () => {
  return (
    <div>
      <label htmlFor='mapel' className='block text-sm font-medium text-gray-700 mb-2'>
        Mata Pelajaran
      </label>
      <input
        className='w-full bg-input p-[17px] text-sm shadow-inner h-11 rounded-md'
        type='text'
        id='mapel'
        placeholder='Isi Mata Pelajaran'
      />
    </div>
  )
}

export default InputMapel