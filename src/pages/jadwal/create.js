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
      <div className='max-w-screen-lg w-screen h-full'>
      <form className='mx-10 items-center'>
  <div className='mb-2 grid items-center'>
    <div className='flex justify-start gap-5 items-center mb-10'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Hari
        </label>
        <HariDropdown name='' value='' />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Jam
        </label>
        <JamDropdown name='' value='' />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Angkatan
        </label>
        <AngkatanDropdown name='' value='' />
      </div>
    </div>
  </div>

  <div className='flex justify-start items-center'>
    <div className='grid items-center overflow-y-auto'>
      <div className='flex justify-start gap-28 items-center mb-4 '>
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
      <div className='flex justify-start gap-28 items-center mb-4 '>
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
      {/* Row 2 with 3 columns */}
      <div className='flex justify-start gap-28 items-center mb-4'>
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
      <div className='flex justify-start gap-28 items-center mb-4'>
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

    <div className='grid items-center'>
      {/* Repeat the structure for the second set of rows */}
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

export default TambahJadwal
