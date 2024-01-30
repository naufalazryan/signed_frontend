import React from 'react'
import { Button } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'

const AddButton =() => {
  return (
    <div className='flex justify-center items-center text-center'>
      <Button className='font-medium bg-sidebar shadow-container border hover:border-none hover:bg-merah text-black hover:text-white transition duration-300 ease-in-out gap-2 rounded-lg w-32 h-12  flex items-center'>
        <FaPlus />
        <span>Tambah</span>
      </Button>
    </div>
  )
}

export default AddButto
