import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { Card } from '@nextui-org/react'
import { CardBody } from '@nextui-org/react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoImageSharp } from 'react-icons/io5'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { IoMdColorPalette } from 'react-icons/io'
import { IoInformation } from 'react-icons/io5'
import { useRouter } from 'next/router'

const HalamanUtama = () => {
  const list = [
    {
      title: "Jadwal",
      icon: FaRegCalendarAlt,
      bgColor: "#b42529",
      path: "/jadwal"
    },
    {
      title: "Gambar",
      icon: IoImageSharp,
      bgColor: "#45db7e",
      path: "/gambar"
    },
    {
      title: "Video",
      icon: MdOutlineOndemandVideo,
      bgColor: "#56c7fd",
      path: "/video"
    },
    {
      title: "Warna",
      icon: IoMdColorPalette,
      bgColor: "#767676",
      path: "/warna"
    },
    {
      title: "Informasi",
      icon: IoInformation,
      bgColor: "#ddd824",
      path: "/informasi"
    }
  ]

  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Halaman Utama</title>
      </Head>
      <div className='max-w-screen-lg w-screen h-full flex justify-center items-center'>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {list.map((item, index) => (
            <Card key={index} isPressable onPress={() => router.push(item.path)}>
              <CardBody
                className="flex items-center justify-center p-10 border rounded-lg text-black bg-input hover:bg-merah hover:text-white transition duration-300 ease-in-out"
                style={{ width: '250px' }}
              >
                {React.createElement(item.icon, { size: 40, className: 'text-primary' })}
                <b className='mt-7'>{item.title}</b>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default HalamanUtama
