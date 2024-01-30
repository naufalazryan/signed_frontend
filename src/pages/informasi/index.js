import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { MdEdit, MdDelete } from 'react-icons/md'
import { useRouter } from 'next/router'
import { Pagination } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'
import ToggleTable from '@/components/switcher/ToggleTable'

const PAGE_SIZE = 7

const Informasi = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  // Data harus dideklarasikan sebelum digunakan
  const data = [
    { id: 1, pengumuman: 'Adzan Zuhur' },
    { id: 2, pengumuman: 'Adzan Zuhur' },
    { id: 3, pengumuman: 'Adzan Zuhur' },
    { id: 4, pengumuman: 'Adzan Zuhur' },
    { id: 5, pengumuman: 'Adzan Zuhur' },
    { id: 6, pengumuman: 'Adzan Zuhur' },
    { id: 7, pengumuman: 'Adzan Zuhur' },
    { id: 8, pengumuman: 'Adzan Zuhur' },
    { id: 9, pengumuman: 'Adzan Zuhur' },
  ]

  const totalPages = Math.ceil(data.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentData = data.slice(startIndex, endIndex)

  const handleCreateClick = () => {
    router.push('/informasi/create')
  }

  const handleDeleteClick = () => {
    router.push('/dashboard/delete')
  }

//   const handleEditClick = (itemId) => {
//     router.push(`/akademik/edit/${itemId}`)
//   }

const handleEditClick = (itemId) => {
    router.push(`/akademik/edit`)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <Layout>
      <Head>
        <title>Pengaturan Informasi</title>
      </Head>
      <div className="max-w-screen-lg w-screen">
        <div className="flex justify-between mx-10 items-center mb-5">
          <h1 className="text-center ml-1 font-semibold text-2xl">PENGATURAN INFORMASI</h1>
          <div className="flex justify-center text-center items-center">
            <button className="font-medium bg-sidebar shadow-container border hover:border-none hover:bg-merah text-black hover:text-white transition duration-300 ease-in-out gap-2 rounded-lg w-32 h-12 flex items-center" onClick={handleCreateClick} title='Click Me'>
              <FaPlus className="ml-4" />
              <span>Tambah</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center text-center">
          <div className="overflow-x-auto w-full mx-10 h-full relative shadow-container sm:rounded-lg">
            <table className="w-full text-sm">
              <thead className="text-black bg-sidebar border">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                   Pengumuman
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white border">
                {currentData.map((item) => (
                  <tr key={item.id} className="border hover:bg-gray-50 transition duration-100">
                    <td className="py-4 px-6">{item.id}</td>
                    <td className="py-4 px-6">{item.pengumuman}</td>
                    <td className='py-4'>
                      <ToggleTable />
                    </td>
                    <td className="py-4 px-6 hover:text-merah transition duration-200">
                      <MdDelete />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center mt-2 mb-2">
              <Pagination
                loop
                showControls
                total={totalPages}
                current={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Informasi