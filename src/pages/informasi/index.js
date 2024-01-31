import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "@/components/Layout";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { Pagination } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import ToggleTable from "@/components/switcher/ToggleTable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PAGE_SIZE = 7;

const Informasi = () => {
  const [data, setData] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/info/get/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data && response.data.data) {
            const { data } = response.data;
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
    router.push("/informasi/create");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.e1.ikma.my.id/api/admin/info/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Data Informasi Berhasil Dihapus", {
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

  const handleToggleChange = async (id, newStatus) => {
    try {
      console.log("Updating resource:", id, newStatus);

      const response = await axios.put(
        `https://api.e1.ikma.my.id/api/admin/info/update/${id}`,
        { status: newStatus ? 1 : 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response);

      if (response.data && response.data.message) {
        console.log("Resource updated successfully");

        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: newStatus ? 1 : 0 } : item
        );

        setData(updatedData);

        toast.success("Status Berhasil TerUpdate", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Invalid response format from server:", response);
        toast.error("Error updating resource");
      }
    } catch (error) {
      console.error("Error updating resource:", error);

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
        console.error("Server response headers:", error.response.headers);

        if (error.response.data && error.response.data.errors) {
          // Log validation errors
          console.error("Validation errors:", error.response.data.errors);
        }
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      toast.error("Error updating resource");
    }
  };

  const handleEditClick = (itemId) => {
    router.push(`/akademik/edit`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Guard against empty data
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head>
        <title>Pengaturan Informasi</title>
      </Head>
      <div className="max-w-screen-lg w-screen">
        <div className="flex justify-between mx-10 items-center mb-5">
          <h1 className="text-center ml-1 font-semibold text-2xl">
            PENGATURAN INFORMASI
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
                    Pengumuman
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white border">
                {currentData.map((item, index) => {
                  const displayNumber =
                    (currentPage - 1) * PAGE_SIZE + index + 1;
                  return (
                    <tr
                      key={item.id}
                      className="border hover:bg-gray-50 transition duration-100"
                    >
                      <td className="py-4 px-6">{displayNumber}</td>
                      <td className="py-4 px-6">{item.pengumuman}</td>
                      <td className="py-4">
                        <ToggleTable
                          id={item.id}
                          initialValue={item.status === 1}
                          onToggle={(newStatus) =>
                            handleToggleChange(item.id, newStatus)
                          }
                        />
                      </td>
                      <td className="py-4 px-6 hover:text-merah transition duration-200">
                        <MdDelete onClick={() => handleDelete(item.id)} />
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

export default Informasi;