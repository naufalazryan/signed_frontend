import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import MapelDropdown from '@/components/dropdown/MapelDropdown'
import HariDropdown from '@/components/dropdown/HariDropdown'
import SaveButton from '@/components/button/Save'
import KelasDropdown from '@/components/dropdown/KelasDropdown'
import AngkatanDropdown from '@/components/dropdown/AngkatanDropdown'
import JamDropdown from '@/components/dropdown/JamDropdown'

const TambahJadwal = () => {
  const [selectedAngkatan, setSelectedAngkatan] = React.useState('')

  return (
    <Layout>
      <Head>
        <title>Tambah Jadwal</title>
      </Head>
      <div className='max-w-screen-lg w-screen h-full flex flex-col justify-center items-center text-center'>
        <h1 className="mb-5 text-2xl font-bold">TAMBAH JADWAL</h1>
        <form className='mt-10'>
          <div className='mb-10 flex justify-start items-center'>
            <div className='flex justify-start gap-5 '>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Angkatan
                </label>
                <AngkatanDropdown name='' value='' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Jam
                </label>
                <JamDropdown name='' value='' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Hari
                </label>
                <HariDropdown name='' value='' />
              </div>
            </div>
          </div>

          <div className='flex justify-start items-center mb-6'>
            <div className=' items-center'>
              <div className='grid grid-cols-4 gap-x-5 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran A
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran B
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran C
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran D
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-start items-center mb-6'>
            <div className=' items-center'>
              <div className='grid grid-cols-4 gap-x-5 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran E
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran F
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran G
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center gap-3 mt-14'>
            <SaveButton />
            <CancelButton />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default TambahJadwal
