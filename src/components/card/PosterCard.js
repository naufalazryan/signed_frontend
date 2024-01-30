import React, { useState } from 'react'
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa"
import Image from 'next/image'
import Poster from '../../../public/images/poster.jpeg'

const PosterCard = ({ id, onEdit }) => {
  const [isButtonOn, setIsButtonOn] = useState(false)

  const handleButtonClick = () => {
    setIsButtonOn((prev) => !prev)
  }

  const handleEditClick = () => {
    onEdit(id)
  }



  return (
    <div className={`group relative cursor-pointer items-center w-36 justify-center m-10 overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/ rounded-lg ${isButtonOn ? '' : ''}`}>

      <div className="h-full w-full">
        <Image
          className="object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
          src={Poster}
          alt=""
          width={200}
          height={100}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-4 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className=" text-xs font-bold text-white mt-10 mb-10">Nama Gambar</h1>
        <div className="flex mt-1 justify-center mb-5">
          <button className="text-white hover:text-merah transition duration-200 p-5 rounded" onClick={handleEditClick} title="Click Me">
            <MdEdit />
          </button>
          <button className="text-white hover:text-merah transition duration-200 p-5 rounded" title='Click Me'>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PosterCard
