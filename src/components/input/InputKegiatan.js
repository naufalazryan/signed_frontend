import React from 'react'

const InputNamaKegiatan = () => {
  return (
    <div>
      <label htmlFor='nama_kegiatan' className='block text-sm font-medium text-gray-700 mb-2'>
        Nama Kegiatan
      </label>
      <input
        className='w-full bg-input p-[17px] text-sm shadow-inner h-11 rounded-md'
        type='text'
        id='nama_kegiatan'
        placeholder='Isi Nama Kegiatan'
      />
    </div>
  )
}

export default InputNamaKegiatan