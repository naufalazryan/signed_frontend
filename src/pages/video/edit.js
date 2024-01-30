import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import UploadButton from '@/components/button/Upload'
import ReactPlayer from 'react-player/youtube'

const EditVideo = () => {
  const [videoUrl, setVideoUrl] = useState('')

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value)
  }

  return (
    <Layout>
      <Head>
        <title>Edit Video</title>
      </Head>
      <div className='max-w-screen-lg w-screen flex items-center justify-center'>
        <form className="w-full flex flex-col items-center max-w-3xl p-8 rounded-md">
          <div className="mb-4 w-full max-w-3xl h-80 bg-sidebar overflow-hidden rounded-lg">
            {videoUrl && (
              <div style={{ height: '100%' }}>
                <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
              </div>
            )}
          </div>
          <label className="text-left">URL Video</label>

          <label
            htmlFor="url_video"
            className="w-full h-14 mt-2 border-[1px] bg-input border-gray-500 border-dashed border-silver rounded-md text-center cursor-pointer"
          >
            <input
              type="url"
              id="url_video"
              name='url_video'
              value={videoUrl}
              onChange={handleInputChange}
              className="w-full h-full p-2"
              placeholder="Masukkan URL Video"
            />
          </label>
          <div className="w-full flex flex-col items-start mt-6">
            <label htmlFor='nama_video' className="text-left">Nama Video</label>
            <input
              className="mt-2 bg-input p-[17px] shadow-inner-3 w-full h-14 rounded-md"
              type="text"
              name='nama_video'
              id='nama_video'
              placeholder="Nama Video"
            />
          </div>
          
          <div className="mt-8 items-start flex gap-2 justify-start mr-auto">
            <UploadButton />
            <CancelButton />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default EditVideo
