import React from 'react'
import { Button } from '@nextui-org/react'

 const SendButton = () => {
  return (
    <div>
      <Button type='submit' className=' border-none bg-merah text-white rounded-md w-48 h-12 shadow-xs shadow-merah'>
        Kirim
      </Button>
    </div>
  )
}

export default SendButton