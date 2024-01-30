import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { MdEdit, MdDelete } from 'react-icons/md'
import { useRouter } from 'next/router'
import { Pagination } from '@nextui-org/react'
import { FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa'


const PAGE_SIZE = 7

const Jadwal = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [isToggleOn, setIsToggleOn] = useState(false)
  const [toggleStatus, setToggleStatus] = useState({})


  const data = [
    { id: 1, kelas: 'X', namaKelas: 'A', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 2, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 3, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 4, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 5, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 6, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 7, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 8, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
    { id: 9, kelas: 'X', namaKelas: 'B', mataPelajaran: 'PKK', jamPelajaran: 10, hari: 'Senin' },
  ]

  
  const totalPages = Math.ceil(data.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentData = data.slice(startIndex, endIndex)
  
  const handleCreateClick = () => {
    router.push('/jadwal/create')
  }

  const handleDeleteClick = () => {
    router.push('/dashboard/delete')
  }

  // const handleEditClick = (itemId) => {
  //   router.push(`/jadwal/edit/${itemId}`)
  // }

  const handleEditClick = (itemId) => {
    router.push(`/jadwal/edit`)
  }


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleToggleClick = (itemId) => {
    setToggleStatus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }


  return (
    <Layout>
      <Head>
        <title>Pengaturan Jadwal</title>
      </Head>
      <div className="max-w-screen-lg w-screen">
        <div className="flex justify-between mx-10 items-center mb-5">
          <h1 className="text-center ml-1 font-semibold text-2xl">PENGATURAN JADWAL</h1>
          <div className='flex justify-center text-center items-center'>
            <button className='font-medium bg-sidebar shadow-container border hover:border-none hover:bg-merah text-black hover:text-white transition duration-300 ease-in-out gap-2 rounded-lg w-32 h-12 flex items-center' onClick={handleCreateClick}>
              <FaPlus className='ml-4' />
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
                    Angkatan
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nama Kelas
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mata Pelajaran
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Jam Pelajaran
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Hari
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white border">
                {currentData.map((item) => (
                  <tr key={item.id} className="border hover:bg-gray-50 transition duration-100">
                    <td className="py-4 px-6">{item.id}</td>
                    <td className="py-4 px-6">{item.kelas}</td>
                    <td className="py-4 px-6">{item.namaKelas}</td>
                    <td className="py-4 px-6">{item.mataPelajaran}</td>
                    <td className="py-4 px-6">{item.jamPelajaran}</td>
                    <td className="py-4 px-6">{item.hari}</td>
                    {/* <td className={`py-4 px-6 transition duration-200`} onClick={() => handleToggleClick(item.id)}>
                      {toggleStatus[item.id] ? (
                        <FaToggleOn className="transform text-green-500" />
                      ) : (
                        <FaToggleOff />
                      )}
                    </td> */}
                    <td className="py-4 px-6 hover:text-merah transition duration-200" onClick={() => handleEditClick(item.id)}>
                      <MdEdit />
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

export default Jadwal
