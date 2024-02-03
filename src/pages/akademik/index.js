import React, { useState, useEffect } from "react"
import { format, isValid } from "date-fns"
import Head from "next/head"
import Layout from "@/components/Layout"
import {  MdDelete } from "react-icons/md"
import { useRouter } from "next/router"
import { Pagination } from "@nextui-org/react"
import { FaPlus } from "react-icons/fa"
import ToggleTable from "@/components/switcher/ToggleTable"

import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"

const PAGE_SIZE = 7

const Akademik = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null

  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/akademik/get/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )

          if (response.data && response.data.data) {
            const { data, meta } = response.data

            if (meta && typeof meta.total_pages !== "undefined") {
              setTotalPages(meta.total_pages)
            } else {
              console.warn(
                "Warning: 'meta' or 'total_pages' is missing or undefined.",
                response.data
              )
            }

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.e1.ikma.my.id/api/admin/akademik/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      setData((prevData) => prevData.filter((item) => item.id !== id))
      toast.success("Data Akademik Berhasil Dihapus", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      console.error("Error deleting resource:", error)
      toast.error("Error deleting resource")
    }
  }

  const handleToggleChange = async (id, newStatus) => {
    try {
      console.log("Updating resource:", id, newStatus)

      const response = await axios.put(
        `https://api.e1.ikma.my.id/api/admin/akademik/update/status/${id}`,
        { status: newStatus ? 1 : 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Response from server:", response)

      if (response.data && response.data.message) {
        console.log("Resource updated successfully")

        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: newStatus ? 1 : 0 } : item
        )

        setData(updatedData)

        toast.success("Data Akademik Berhasil Diubah ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

      } else {
        console.error("Invalid response format from server:", response)
        toast.error("Error updating resource")
      }
    } catch (error) {
      console.error("Error updating resource:", error)

      if (error.response) {
        console.error("Server response data:", error.response.data)
        console.error("Server response status:", error.response.status)
        console.error("Server response headers:", error.response.headers)

        if (error.response.data && error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors)
        }
      } else if (error.request) {
        console.error("No response received from the server")
      } else {
        console.error("Error setting up the request:", error.message)
      }

      toast.error("Error updating resource")
    }
  }

  const totalPages = Math.ceil(data.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentData = data.slice(startIndex, endIndex)

  const handleCreateClick = () => {
    router.push("/akademik/create")
  }

  const handleEditClick = (itemId) => {
    router.push(`/akademik/edit`)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <Layout>
      <Head>
        <title>Pengaturan Akademik</title>
      </Head>
      <div className="max-w-screen-lg w-screen">
        <div className="flex justify-between mx-10 items-center mb-5">
          <h1 className="text-center ml-1 font-semibold text-2xl">
            PENGATURAN AKADEMIK
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
                    Nama Kegiatan
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mulai
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Selesai
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
                      <td className="py-4 px-6">{item.kegiatan}</td>
                      <td className="py-4 px-6">
                        {isValid(new Date(item.tanggal_mulai))
                          ? format(new Date(item.tanggal_mulai), "dd MMMM yyyy")
                          : "Invalid Date"}
                      </td>
                      <td className="py-4 px-6">
                        {isValid(new Date(item.tanggal_selesai))
                          ? format(
                              new Date(item.tanggal_selesai),
                              "dd MMMM yyyy"
                            )
                          : "Belum Ada Data"}
                      </td>
                      <td className="py-4 px-6">
                        <ToggleTable
                          id={item.id}
                          initialValue={item.status == 1}
                          onToggle={(newStatus) =>
                            handleToggleChange(item.id, newStatus)
                          }
                        />
                      </td>
                      <td className="py-4 px-6 hover:text-merah transition duration-200">
                        <MdDelete onClick={() => handleDelete(item.id)} />
                      </td>
                    </tr>
                  )
                })}
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
      <ToastContainer className="mt-12" />
    </Layout>
  )
}

export default Akademik