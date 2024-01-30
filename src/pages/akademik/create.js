import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import CancelButton from '@/components/button/Cancel';
import SaveButton from '@/components/button/Save';
import InputNamaKegiatan from '@/components/input/InputKegiatan';
import JadwalMulai from '@/components/datepicker/JadwalMulai';
import JadwalSelesai from '@/components/datepicker/JadwalSelesai';
import ToggleStatus from '@/components/switcher/ToggleStatus';
import ToggleTable from '@/components/switcher/ToggleTable';

const TambahAkademik = () => {
    return (
        <Layout>
            <Head>
                <title>Tambah Akademik</title>
            </Head>
            <div className='max-w-screen-lg w-screen h-full'>
                <h1 className='text-2xl font-bold text-center'>TAMBAH AKADEMIK</h1>
                <div className='mt-8'>
                    <form className='max-w-md mx-auto items-center mt-24'>
                        <div className='grid items-center'>
                            <div>
                                <div className='mb-4'>
                                    <InputNamaKegiatan name='' value='' />
                                </div>
                                <div className='flex justify-center items-center gap-5'>

                                <div className='mb-4'>
                                    <label className='block mb-1 text-sm font-medium text-gray-700'>Jadwal Mulai</label>
                                    <JadwalMulai name='' value='' />
                                </div>

                                <div className='mb-4'>
                                    <label className='block mb-1 text-sm font-medium text-gray-700'>Jadwal Selesai</label>
                                    <JadwalSelesai name='' value='' />
                                </div>
                                </div>

                                <div className='mb-14 flex justify-start items-center'>
                                    <ToggleStatus name='' value='' />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-start gap-3'>
                            <SaveButton name='' value='' />
                            <CancelButton name='' value='' />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default TambahAkademik;
