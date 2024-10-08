import React from 'react'
import { Button } from '@nextui-org/react'

const UploadButton = () => {
  return (
    <div>
      <Button className='border-none bg-merah text-white rounded-md w-48 h-12 shadow-sm hover:bg-red-800 transition duration-200' title='Simpan' type='submit'>
        Simpan
      </Button>
    </div>
  )
}

export default  UploadButton