import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

const VideoCard = ({ id, videoUrl, name, onEdit }) => {
    const [isButtonOn, setIsButtonOn] = useState(false)

    const handleButtonClick = () => {
        setIsButtonOn((prev) => !prev)
    }

    const handleEditClick = () => {
        onEdit(id)
    }

    return (
        <div className={`group relative cursor-pointer items-center w-60 justify-center  overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/ rounded-lg ${isButtonOn ? '' : ''}`}>
            <div className="h-full w-60">
                <ReactPlayer
                    url={videoUrl}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-4 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="text-xs font-bold text-white mb-10 mt-10">{name}</h1>
                <div className="flex mt-1 justify-center space-x-2 mb-5">
                    <button className="text-white hover:text-merah transition duration-200 p-5 rounded" onClick={handleEditClick} title='Edit Video'>
                        <MdEdit />
                    </button>
                    <button
                        className={`rounded-full p-5 font-com text-xs capitalize ${isButtonOn ? 'bg-white text-black hover:text-white hover:bg-merah' : 'bg-white text-black hover:text-white hover:bg-merah transition duration-200'}`}
                        onClick={handleButtonClick} title='On Off'
                    >
                        {isButtonOn ? 'Off' : 'On'}
                    </button>
                    <button className="text-white hover:text-merah transition duration-200 p-5 rounded" title='Click Me'>
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
