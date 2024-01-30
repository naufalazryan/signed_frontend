import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { TfiExport } from "react-icons/tfi"
import CancelButton from '@/components/button/Cancel'
import UploadButton from '@/components/button/Upload'
import Image from 'next/image'

const TambahGambar = () => {
    const fileInputRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileInputClick = () => {
        fileInputRef.current.click() 
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file)
    }

    return (
        <Layout>
            <Head>
                <title>Tambah Gambar</title>
            </Head>
            <div className='mb-96 max-w-screen-lg w-screen'>
            </div>
            <form className='absolute w-screen flex items-center justify-center h-screen mt-6'>
                <div className="flex flex-col w-full max-w-3xl p-8 rounded-md">
                    <p className='text-abuTua text-xs mb-2 mt-8 text-end'>Max: 50 MB. Format PNG, JPG, JPEG</p>
                    <div className="mb-4 max-w-4xl w-full p-5 bg-input rounded-lg h-52">
                        {selectedFile && (
                            <Image
                                src={URL.createObjectURL(selectedFile)}
                                alt="Preview"
                                width={100}
                                height={100}
                                or
                                className="w-full h-full object-contain border-gray-300 rounded-md"
                            />
                        )}
                    </div>
                    <label htmlFor="file_input" className="w-full h-14 mt-10 border-[1px] bg-input border-gray-500 border-dashed border-silver rounded-md text-center cursor-pointer">
                        <input
                            type="file"
                            id="file_input"
                            name='file_input'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                            onClick={handleFileInputClick}
                        />
                        <div className="flex items-center justify-center mt-4">
                            <TfiExport className="w-5 h-5 mr-2 cursor-pointer" />
                            <p className='text-sm cursor-pointer'>Upload Gambar</p>
                        </div>
                    </label>
                    <div className='w-full flex flex-col items-start mt-6'>
                        <label className='text-left' htmlFor='nama_gambar'>Nama Gambar</label>
                        <input id='nama_gambar' name='nama_gambar' className='mt-2 bg-input p-[17px] shadow-inner border w-full h-10 rounded-md' type='text' placeholder='Nama Gambar' />
                    </div>
                    <div className='mt-8 items-start flex gap-2 justify-start mr-auto'>
                        <UploadButton />
                        <CancelButton />
                    </div>
                </div>
            </form>
        </Layout>


    )
}

export default TambahGambar
