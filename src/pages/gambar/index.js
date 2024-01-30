import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import PosterCard from '@/components/card/PosterCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'

const Gambar = () => {
  const [isButtonOn, setIsButtonOn] = useState(false)
  const router = useRouter()

  const handleButtonClick = () => {
    setIsButtonOn((prev) => !prev)
  }

  const handleCreateClick = () => {
    router.push('/gambar/create')
  }

  // const handleEdit = (gambarId) => {
  //   router.push(`/edit/${gambarId}`) 
  // }

  const handleEdit = (gambarId) => {
    router.push(`gambar/edit`)
  }

  const dataGambar = [
    { id: 1, imageUrl: 'URL_GAMBAR_1', name: 'Nama Gambar 1' },
    { id: 2, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 2' },
    { id: 3, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 3' },
    { id: 4, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 4' },
    { id: 5, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 5' },
    { id: 6, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 6' },
    { id: 7, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 7' },
    { id: 8, imageUrl: 'URL_GAMBAR_2', name: 'Nama Gambar 8' },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  }

  return (
    <Layout>
      <Head>
        <title>Pengaturan Gambar</title>
      </Head>
      <div className='max-w-screen-lg mx-auto p-10'>
        <div className='flex justify-between items-center mx-[60px]'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-3xl font-bold mb-10 text-center'>PENGATURAN GAMBAR</h1>

          <div className='flex justify-center items-center'>
            <a
              onClick={handleCreateClick} title='Click Me'
              className='mb-10 bg-sidebar cursor-pointer p-4 rounded-lg flex items-center space-x-3 shadow shadow-gray-300 hover:bg-merah hover:text-white transition duration-300'
            >
              <FaPlus />
              <span className='cursor-pointer'>Tambah</span>
            </a>
          </div>
        </div>
        <Slider {...settings}>
          {dataGambar.map((gambar) => (
            <div key={gambar.id} className='mb-28'>
              <PosterCard id={gambar.id} imageUrl={gambar.imageUrl} name={gambar.name} onEdit={() => handleEdit(gambar.id)} />
            </div>
          ))}
        </Slider>
      </div>
    </Layout>
  )
}

export default Gambar
