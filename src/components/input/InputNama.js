import React from 'react'
import { FaUser } from "react-icons/fa"

const InputNama = () => {
    return (
        <div className="relative w-full flex items-center">
            <FaUser className="absolute left-3 text-abuTua mt-2" />
            <input
                className='pl-10 mt-2 bg-sidebar p-[17px] shadow-inner w-full h-11 rounded-md'
                type='text'
                id='nama'
                name='nama'
                placeholder='Nama Pengguna'
                autoComplete="username" 
            />
        </div>
    )
}

export default InputNama