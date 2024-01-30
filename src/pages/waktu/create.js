import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import SaveButton from '@/components/button/Save'
import InputWaktu from '@/components/input/InputWaktu'
import InputJamMapel from '@/components/input/InputJamMapel'

const TambahWaktu = () => {

    return (
        <Layout>
            <Head>
                <title>Tambah Waktu</title>
            </Head>
            <div className='max-w-screen-lg w-screen h-full'>
                <h1 className='text-2xl font-bold text-center'>TAMBAH WAKTU</h1>
                <div className='mt-8'>
                    <form className='max-w-md mx-auto items-center mt-24'>
                        <div className='grid items-center gap-x-5'>
                            <div>
                                <div className='mb-5'>
                                    <InputJamMapel name='' value='' />
                                </div>
                                <div className='mb-20'>
                                    <InputWaktu name='' value='' />
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

export default TambahWaktu