import React from 'react'
import { Button } from '@nextui-org/react'

 const ButtonLogin = () => {
  return (
    <div className='max-w-screen-lg w-full'>
      <Button className='border-none bg-merah text-white rounded-md w-full h-12 shadow-xs hover:bg-red-800 transition duration-200'>
        Masuk
      </Button>
    </div>
  )
}

export default ButtonLogin
