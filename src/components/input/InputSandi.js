import React from 'react';
import { FaKey } from 'react-icons/fa';

const InputSandi = () => {
    return (
        <div className="relative w-full flex items-center">
            <FaKey className="absolute left-3 text-abuTua mt-2" />
            <input
                className='pl-10 mt-2 bg-sidebar p-[17px] shadow-inner w-full h-11 rounded-md'
                type='password'
                id='sandi'
                name='sandi'
                placeholder='Kata Sandi'
                autoComplete="current-password"
            />
        </div>
    );
}

export default InputSandi
