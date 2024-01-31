"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { Pagination } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify"; 

// import animatedSpinner from "@/../../public/images/";

// Make sure to import ToastContainer

const Akademik = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  // Check if window is defined to ensure it's running on the client side
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Check if token is available before making the request
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/akademik/get/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data && response.data.data) {
            const { data, meta } = response.data;

            if (meta && typeof meta.total_pages !== "undefined") {
              setTotalPages(meta.total_pages);
            } else {
              console.warn(
                "Warning: 'meta' or 'total_pages' is missing or undefined.",
                response.data
              );
            }

            setData(data);
          } else {
            console.error("Invalid data format in the response:", response);
          }
        } else {
          console.warn(
            "Token is not available. User may not be authenticated."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCreateClick = () => {
    router.push("/akademik/create");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.e1.ikma.my.id/api/admin/akademik/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Data Akademik Berhasil Dihapus", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Error deleting resource");
    }
  };

  const handleEditClick = (itemId) => {
    router.push(`/akademik/edit/${itemId}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                    Tanggal
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white border">
                {data.map((item) => {
                  console.log(
                    `Item ID: ${item.id}, Status: ${
                      item.status
                    }, Type: ${typeof item.status}`
                  );
                  return (
                    <tr
                      key={item.id}
                      className="border hover:bg-gray-50 transition duration-100"
                    >
                      <td className="py-4 px-6">{item.id}</td>
                      <td className="py-4 px-6">{item.kegiatan}</td>
                      <td className="py-4 px-6">{item.tanggal}</td>
                      <td className="py-4 px-6">
                        {item.status ==  1 ? "ON" : "OFF"}
                      </td>
                      <td
                        className="py-4 px-6 hover:text-merah transition duration-200"
                        onClick={() => handleEditClick(item.id)}
                      >
                        <MdEdit />
                      </td>
                      <td className="py-4 px-6 hover:text-merah transition duration-200">
                        <MdDelete onClick={() => handleDelete(item.id)}/>
                      </td>
                    </tr>
                  );
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
  );
};

export default Akademik;
