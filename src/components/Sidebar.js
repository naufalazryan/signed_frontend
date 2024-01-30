import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/logo.png'
import { HiMenuAlt3 } from "react-icons/hi"
import { FaHome } from "react-icons/fa"
import { FaRegCalendarAlt } from "react-icons/fa"
import { IoMdTime } from "react-icons/io"
import { FaBook } from "react-icons/fa"
import { IoImageSharp } from "react-icons/io5"
import { MdOutlineOndemandVideo } from "react-icons/md"
import { IoMdColorPalette } from "react-icons/io"
import { IoInformation } from "react-icons/io5"
import { HiAcademicCap } from "react-icons/hi2"
import { useRouter } from 'next/router'

const Sidebar = () => {
  const menus = [
    { name: 'Halaman Utama', link: '/', icon: FaHome },
    { name: 'Pengaturan Jadwal', link: '/jadwal', icon: FaRegCalendarAlt },
    { name: 'Pengaturan Jam', link: '/waktu', icon: IoMdTime },
    { name: 'Pengaturan Mapel', link: '/mapel', icon: FaBook },
    { name: 'Pengaturan Akademik', link: '/akademik', icon: HiAcademicCap },
    { name: 'Pengaturan Gambar', link: '/gambar', icon: IoImageSharp },
    { name: 'Pengaturan Video', link: '/video', icon: MdOutlineOndemandVideo },
    { name: 'Pengaturan Warna', link: '/warna', icon: IoMdColorPalette },
    { name: 'Pengaturan Informasi', link: '/informasi', icon: IoInformation },
  ]
  const [open, setOpen] = useState(true)
  const router = useRouter()

  return (
    <section className='flex'>
      <div
        className={`bg-sidebar ${open ? 'w-72' : 'w-[70px]'} text-abuTua px-4 transition-all  duration-300`}
        style={{ minHeight: '100vh' }}
      >
        <div className='py-3 flex justify-between items-center'>
          {open && (
            <Image
              src={Logo}
              alt='Logo'
              priority
              className='w-36 h-10 mx-auto cursor-pointer'
              onClick={() => router.push('/')}
            />
          )}
          <HiMenuAlt3
            size={26}
            className={`cursor-pointer ${open ? 'rotate-0' : 'rotate-180 ml-2 transition duration-400'}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div
          className={`mt-4 flex flex-col bg-white shadow-lg relative rounded-lg ${!open ? 'pl-3 mt-7 w-10' : ''}`}>
          {menus?.map((menu, i) => (
            <Link href={menu.link || '/'} key={i}>
              <div
                className={`group flex items-center text-sm gap-4  m-1 px-3 py-3 hover:rounded-lg ${open ? 'hover:bg-merahMuda hover:text-merah transition duration-100' : 'hover:text-merah'} rounded-md ${!open ? 'p-3 justify-center' : ''}`}>
                <div className='relative'>
                  <div className='relative z-10'>{React.createElement(menu?.icon, { size: '18' })}</div>
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!open ? 'opacity-0 translate-x-20 overflow-hidden' : ''}`}>
                  {menu?.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sidebar
