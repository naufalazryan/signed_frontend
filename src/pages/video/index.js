import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import VideoCard from '@/components/card/VideoCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'

const Video = () => {
  const [isButtonOn, setIsButtonOn] = useState(false)
  const router = useRouter()

  const handleButtonClick = () => {
    setIsButtonOn((prev) => !prev)
  }

  const handleCreateClick = () => {
    router.push('/video/create')
  }

  // const handleEdit = (videoId) => {
  //   router.push(`/video/edit/${videoId}`)
  // }

  const handleEdit = (videoId) => {
    router.push(`/video/edit`)
  }

  const dataVideo = [
    { id: 1, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 1' },
    { id: 2, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 2' },
    { id: 3, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 3' },
    { id: 4, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 4' },
    { id: 5, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 5' },
    { id: 6, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 6' },
    { id: 7, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 7' },
    { id: 8, videoUrl: 'https://www.youtube.com/watch?v=_NN1DOta7P0', name: 'Nama Video 8' },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,

  }

  return (
    <Layout>
      <Head>
        <title>Pengaturan Video</title>
      </Head>
      <div className='max-w-screen-lg mx-auto p-10'>
        <div className='flex justify-between items-center p-10'>
          <h1 className='text-2xl font-bold text-center mb-9'>PENGATURAN VIDEO</h1>
          <div className='flex justify-center items-center'>
            <a
              onClick={handleCreateClick}
              className='mb-10 bg-sidebar cursor-pointer p-4 rounded-lg flex items-center space-x-3 shadow shadow-gray-300 hover:bg-merah hover:text-white transition duration-300'
            >
              <FaPlus />
              <span className='cursor-pointer'>Tambah</span>
            </a>
          </div>
        </div>
        <Slider {...settings}>
          {dataVideo.map((video) => (
            <div key={video.id} className='mb-28 ml-10'>
              <VideoCard id={video.id} videoUrl={video.videoUrl} name={video.name} onEdit={() => handleEdit(video.id)} />
            </div>
          ))}
        </Slider>
      </div>
    </Layout>
  )
}

export default Video
