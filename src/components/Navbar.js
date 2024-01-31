import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from 'next/image'
import Logo2 from '../../public/images/logo2.png'
import NavDropdown from './dropdown/NavDropdown'

const Navbar = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [router])

  return (
    <nav className='bg-white border-b-[1px] border-t-0 border-l-0 border-r-0 border-abuNavbar'>
      <div className='mx-10'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <Image src={Logo2} className='w-14 h-14' alt="logo" priority />
            </div>
          </div>
          <div className='hidden md:flex items-center space-x-4'>
            <span className='text-black font-medium text-sm'>
              {username}
            </span>
            <NavDropdown />
          </div>
          <div className='md:hidden'>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
