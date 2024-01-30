import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import SendButton from '@/components/button/Send'
import CancelButton from '@/components/button/Cancel'
import ToggleStatus from '@/components/switcher/ToggleStatus'


const TambahInformasi = () => {
  const [announcement, setAnnouncement] = useState("")

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Pengumuman:", announcement)
  }

  const textareaStyle = {
    width: '750px',
    height: 'full',
    padding: '20px',
    
    border: '1px',
    borderRadius: '10px',
    fontSize: '16px',
    backgroundColor: '#f8f8f8',
    boxShadow: 'inset 0 1px 3px 2px rgba(0,0,0,0.20)',
  }

  return (
    <Layout useContainer>
      <Head>
        <title>Tambah Informasi</title>
      </Head>
      <div className='max-w-screen-lg w-screen flex justify-center z-10  flex-col items-center'>
        <h1 className='text-2xl font-bold mb-20 text-center'>TAMBAH INFORMASI</h1>
      <form className="flex flex-col items-start">
        <label className='ml-3 mb-3' htmlFor='pengumuman'>Pengumuman</label>
        <textarea
          style={textareaStyle}
          value={announcement}
          onChange={handleAnnouncementChange}
          placeholder='Isi Pengumuman'
          id='pengumuman'
          name=''
          className=' mb-2 shadow-none bg-transparent'
          rows="3"
        />
        <div>
            <ToggleStatus />
        </div>
        <div className='flex gap-3 ml-3 mt-10'>
          <SendButton value='' name='' />
          <CancelButton value='' name=''/>
        </div>
        <div>
        </div>
      </form>
      </div>
    </Layout>
  )
}

export default TambahInformasi