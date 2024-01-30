import React from 'react'
import { Button } from '@nextui-org/react'

const CancelButton = ()  => {
    return (
        <div>
            <Button className=' bg-white  text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1'>
                Batal
            </Button>
        </div>
    )
}

export default CancelButton