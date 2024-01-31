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

const EditJadwal = () => {
  const [selectedAngkatan, setSelectedAngkatan] = React.useState('')

  return (
    <Layout>
      <Head>
        <title>Edit Jadwal</title>
      </Head>
      <div className='max-w-screen-lg w-screen h-full'>
        <form className='mx-32 items-center'>
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

          <div className='flex justify-start items-center'>
            <div className=' items-center'>
              <div className='flex justify-start gap-20  mb-4 '>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas A
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas E
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
              <div className='flex justify-start gap-20  mb-4 '>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas B
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas F
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
              <div className='flex justify-start gap-20  mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas C
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas G
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
              <div className='flex justify-start gap-20  mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Kelas D
                  </label>
                  <KelasDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center gap-3 mt-10'>
            <SaveButton />
            <CancelButton />
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default EditJadwal
