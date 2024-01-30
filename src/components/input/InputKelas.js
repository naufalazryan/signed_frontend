import React from 'react'

const InputKelas = () => {
  return (
    <div>
      <label htmlFor='kelas' className='block text-sm font-medium text-gray-700 mb-2'>
        Kelas
      </label>
      <input
        className='w-full bg-input p-[17px]  shadow-inner h-11 rounded-md'
        type='text'
        id='kelas'
        name='kelas'
        placeholder='Isi Kelas'
      />
    </div>
  )
}

export default InputKelas