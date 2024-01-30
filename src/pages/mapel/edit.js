import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import SaveButton from '@/components/button/Save'
import JadwalMulai from '@/components/datepicker/JadwalMulai'
import JadwalSelesai from '@/components/datepicker/JadwalSelesai'
import ToggleTable from '@/components/switcher/ToggleTable'
import InputMapel from '@/components/input/InputMapel'

const EditMapel = () => {

    return (
        <Layout>
            <Head>
                <title>Edit Mapel</title>
            </Head>
            <div className='max-w-screen-lg w-screen h-full'>
                <h1 className='text-2xl font-bold text-center'>EDIT MAPEL</h1>
                <div className='mt-8'>
                    <form className='max-w-md mx-auto items-center mt-24'>
                        <div className='grid items-center gap-x-5'>
                            <div>
                                <div className='mb-20'>
                                    <InputMapel name='' value='' />
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

export default EditMapel