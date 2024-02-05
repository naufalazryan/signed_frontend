import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const PAGE_SIZE = 7;

const Jadwal = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    { id: 1, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 2, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 3, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 4, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 5, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
  
    { id: 6, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 7, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 8, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 9, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
    { id: 10, kelas: 'X', namaKelas: 'A', mataPelajaranA: 'Networking', mataPelajaranB: 'Robotic', mataPelajaranC: 'IOT' 
    , mataPelajaranD: 'PWdPB', mataPelajaranE: 'PKK', mataPelajaranF: 'DMI', mataPelajaranG: 'DGP',  hari: 'Senin' },
   
  ]

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const visiblePages = 4;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    router.push('/jadwal/create');
  };

  const handleDeleteClick = () => {
    router.push('/dashboard/delete');
  };

  const handleEditClick = (itemId) => {
    router.push(`/jadwal/edit`);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head>
        <title>Pengaturan Jadwal</title>
      </Head>
      <div className="max-w-screen-lg w-screen">
        <div className="flex justify-between mx-10 items-center mb-5">
          <h1 className="text-center ml-1 font-semibold text-2xl">PENGATURAN JADWAL</h1>
          <div className="flex justify-center text-center items-center">
            <button
              className="font-medium bg-sidebar shadow-container border hover:border-none hover:bg-merah text-black hover:text-white transition duration-300 ease-in-out gap-2 rounded-lg w-32 h-12 flex items-center"
              onClick={handleCreateClick}
            >
              <FaPlus className="ml-4" />
              <span>Tambah</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center text-center">
          <div className="overflow-x-auto w-full mx-10 h-full relative shadow-container sm:rounded-lg sb-hidden overflow-hidden">
            <table className="w-full text-xs">
              <thead className="text-black bg-sidebar border">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Kelas
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Jam
                  </th>
                  <th scope="col" className="py-3 px-6">
                    A
                  </th>
                  <th scope="col" className="py-3 px-6">
                    B
                  </th>
                  <th scope="col" className="py-3 px-6">
                    C
                  </th>
                  <th scope="col" className="py-3 px-6">
                    D
                  </th>
                  <th scope="col" className="py-3 px-6">
                    E
                  </th>
                  <th scope="col" className="py-3 px-6">
                    F
                  </th>
                  <th scope="col" className="py-3 px-6">
                    G
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
                    <td className="py-4 px-6">{item.mataPelajaranA}</td>
                    <td className="py-4 px-6">{item.mataPelajaranB}</td>
                    <td className="py-4 px-6">{item.mataPelajaranC}</td>
                    <td className="py-4 px-6">{item.mataPelajaranD}</td>
                    <td className="py-4 px-6">{item.mataPelajaranE}</td>
                    <td className="py-4 px-6">{item.mataPelajaranF}</td>
                    <td className="py-4 px-6">{item.mataPelajaranG}</td>
                    <td className="py-4 px-6">{item.hari}</td>
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
          </div>
        </div>
        <nav className="flex items-center justify-center mt-10">
          <button
            type="button"
            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
            <span aria-hidden="true" className="sr-only">
              Previous
            </span>
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const page = startPage + index;
            return (
              <button
                key={page}
                type="button"
                className={`min-h-[38px] min-w-[38px] ${page === currentPage
                    ? 'text-white bg-merah hover:bg-red-800 focus:bg-red-800'
                    : 'text-black bg-gray-50 hover:bg-gray-100 focus:bg-red-800'
                  } border py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
          
          <button
            type="button"
            className="min-h-[38px] min-w-[38px] flex justify-center items-center border hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true" className="sr-only">
              Next
            </span>
            <MdKeyboardArrowRight />
          </button>
        </nav>
      </div>
    </Layout>
  );
}

export default Jadwal;
