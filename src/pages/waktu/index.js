import React, { useState, useEffect } from "react"
import axios from "axios"
import Head from "next/head"
import Layout from "@/components/Layout"
import { MdEdit, MdDelete } from "react-icons/md"
import { useRouter } from "next/router"
import { FaPlus } from "react-icons/fa"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PAGE_SIZE = 7

const Waktu = () => {
  const [data, setData] = useState([])
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  
  const totalPages = Math.ceil(data.length / PAGE_SIZE)
  const visiblePages = 4
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  const endPage = Math.min(totalPages, startPage + visiblePages - 1)
  
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentData = data.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const { id } = router.query
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/jam/get/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )

          if (response.data && response.data.data) {
            const { data } = response.data
            setData(data)
          } else {
            console.error("Invalid data format in the response:", response)
          }
        } else {
          console.warn(
            "Token is not available. User may not be authenticated."
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error.message || error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token])



  const handleCreateClick = () => {
    router.push("/waktu/create")
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.e1.ikma.my.id/api/admin/jam/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      setData((prevData) => prevData.filter((item) => item.id !== id))
      toast.success("Data Waktu Berhasil Dihapus", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } catch (error) {
      console.error("Error deleting resource:", error)
      toast.error("Error deleting resource")
    }
  }

  const handleEditClick = (itemId) => {
    router.push(`/waktu/edit/${itemId}`)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }



  return (
    <Layout>
      <Head>
        <title>Pengaturan Waktu</title>
      </Head>
      <div className="max-w-screen-lg w-screen">
        <div className="flex justify-between mx-10 items-center mb-5">
          <h1 className="text-center ml-1 font-semibold text-2xl">
            PENGATURAN WAKTU
          </h1>
          <div className="flex justify-center text-center items-center">
            <button
              className="font-medium bg-sidebar shadow-container border hover:border-none hover:bg-merah text-black hover:text-white transition duration-300 ease-in-out gap-2 rounded-lg w-32 h-12 flex items-center"
              onClick={handleCreateClick}
              title="Click Me"
            >
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
                    Jam Pelajaran
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Waktu
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white border">
                {currentData.map((item, index) => {
                  const displayNumber =
                    (currentPage - 1) * PAGE_SIZE + index + 1
                  return (
                    <tr
                      key={item.id}
                      className="border hover:bg-gray-50 transition duration-100"
                    >
                      <td className="py-4 px-6">{displayNumber}</td>
                      <td className="py-4 px-6">{item.jam}</td>
                      <td className="py-4 px-6">{item.waktu}</td>
                      <td className="py-4 px-6 hover:text-merah transition duration-200">
                        <MdEdit
                          name=""
                          value=""
                          onClick={() => handleEditClick(item.id)}
                        />
                      </td>
                      <td className="py-4 px-6 hover:text-merah transition duration-200">
                        <MdDelete
                          name=""
                          value=""
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  )
                })}
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
                const page = startPage + index
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
                )
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
      <ToastContainer className="mt-12" />
    </Layout>
  )
}

export default Waktu