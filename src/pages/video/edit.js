import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import UploadButton from '@/components/button/Upload'
import { FaLink } from 'react-icons/fa'
import ReactPlayer from 'react-player/youtube'
import ToggleVideo from '@/components/switcher/ToggleVideo'

const EditVideo = () => {
  const [videoUrl, setVideoUrl] = useState('')

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value)
  }

  return (
    <Layout>
      <Head>
        <title>Tambah Video</title>
      </Head>
      <div className='max-w-screen-lg w-screen flex items-center justify-center'>
        <form className="w-full flex flex-col items-center max-w-3xl p-8 rounded-md">
          <div className="mb-4 w-full max-w-3xl h-64 bg-sidebar overflow-hidden rounded-lg">
            {videoUrl && (
              <div style={{ height: '100%' }}>
                <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
              </div>
            )}
          </div>
          <label htmlFor="tambah_url" className="w-full mt-2 border-2 bg-input border-gray-500 border-dashed rounded-sm text-center cursor-pointer">
            <div className="flex items-center">
              <FaLink className="w-10" />
              <input
                type="url"
                name='tambah_url'
                id="tambah_url"
                value={videoUrl}
                onChange={handleInputChange}
                className="w-full h-full p-2 bg-sidebar"
                placeholder="Masukkan URL Video"
              />
            </div>
          </label>

          <div className="w-full flex flex-col items-start mt-6">
            <label htmlFor='nama_video' className="text-left text-md">Nama Video</label>
            <input
              className="mt-2 bg-sidebar p-[15px] shadow-inner-3 w-full h-12 rounded-lg mb-1"
              type="text"
              name='nama_video'
              id='nama_video'
              placeholder="Nama Video"
            />

            <div className='mt-2'>
              <ToggleVideo name='' value='' />
            </div>
          </div>

          <div className="mt-5 items-start flex gap-2 justify-start mr-auto">
            <UploadButton />
            <CancelButton />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default EditVideo
