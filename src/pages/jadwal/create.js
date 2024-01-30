import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import MapelDropdown from '@/components/dropdown/MapelDropdown'
import HariDropdown from '@/components/dropdown/HariDropdown'
import SaveButton from '@/components/button/Save'
import InputKelas from '@/components/input/InputKelas'
import InputJamMapel from '@/components/input/InputJamMapel'
import ToggleStatus from '@/components/switcher/ToggleStatus'
import NamaKelasDropdown from '@/components/dropdown/KelasDropdown'
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
        {/* <h1 className='text-2xl font-bold text-center mb-5'>TAMBAH JADWAL</h1> */}
        <form className='mx-10 items-center'>
          <div className='mb-5 grid items-center'>
              <div className='flex justify-start gap-5 items-center'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Hari
                  </label>
                  <HariDropdown />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Jam
                  </label>
                  <JamDropdown />
                </div>
              </div>
            </div>
          <div className='mb-5 grid items-center gap-x-5'>
            <div className='flex justify-start gap-10'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Angkatan
                </label>
                <AngkatanDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nama Kelas
                </label>
                <KelasDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Mata Pelajaran
                </label>
                <MapelDropdown />
              </div>
            </div>
          </div>
          <div className='mb-5 grid items-center gap-x-5'>
            <div className='flex justify-start gap-10'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Angkatan
                </label>
                <AngkatanDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nama Kelas
                </label>
                <KelasDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Mata Pelajaran
                </label>
                <MapelDropdown />
              </div>
            </div>
          </div>
          <div className='mb-5 grid items-center gap-x-5'>
            <div className='flex justify-start gap-10'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Angkatan
                </label>
                <AngkatanDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nama Kelas
                </label>
                <KelasDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Mata Pelajaran
                </label>
                <MapelDropdown />
              </div>
            </div>
          </div>
          <div className='mb-20 grid items-center gap-x-5'>
            <div className='flex justify-start gap-10'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Angkatan
                </label>
                <AngkatanDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nama Kelas
                </label>
                <KelasDropdown />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Mata Pelajaran
                </label>
                <MapelDropdown />
              </div>
            </div>
          </div>
          <div className='flex justify-center gap-3'>
            <SaveButton />
            <CancelButton />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default TambahJadwal
