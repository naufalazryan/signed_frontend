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

const EditJadwal = () => {

  return (
    <Layout>
      <Head>
        <title>Edit Jadwal</title>
      </Head>
      <div className='max-w-screen-lg w-screen h-full'>
        <h1 className='text-2xl font-bold text-center mb-5'>EDIT JADWAL</h1>
        <div className='mt-8'>
          <form className='max-w-md mx-auto items-center'>
            <div className='grid items-center gap-x-5'>
              <div className='mb-4'>
                <div className='mb-4'>
                  <label htmlFor='hari' className='block text-sm font-medium text-gray-700 mb-2'>
                    Hari
                  </label>
                  <HariDropdown />
                </div>

                <label htmlFor='mapel' className='block text-sm font-medium text-gray-700 mb-2'>
                  Mata Pelajaran
                </label>
                <MapelDropdown />
              </div>

              <div>
                <div className='mb-4'>
                  <InputJamMapel />
                </div>

                <div className='mb-4'>
                  <InputKelas />
                </div>


                <div className='mb-8'>
                  <ToggleStatus />
                </div>
              </div>
            </div>


            <div className='flex justify-start gap-3'>
              <SaveButton />
              <CancelButton />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditJadwal
