import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import { Button } from "@nextui-org/react";

const TambahWaktu = () => {
  const router = useRouter();

  const [newData, setNewData] = useState({
    jam: "",
    waktu: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const token = localStorage.getItem("token");

    Object.entries(newData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post(
        "https://api.e1.ikma.my.id/api/admin/jam/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/waktu");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error adding data:", error.response.data);
        // Handle errors as needed
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server.");
        // Handle errors as needed
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        // Handle errors as needed
      }
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/waktu");
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Waktu</title>
      </Head>
      <div className="max-w-screen-lg w-screen h-full">
        <h1 className="text-2xl font-bold text-center">TAMBAH WAKTU</h1>
        <div className="mt-8">
          <form
            className="max-w-md mx-auto items-center mt-24"
            onSubmit={handleSubmit}
          >
            <div className="grid items-center gap-x-5">
              <div>
                <div className="mb-5">
                  <input
                    className="mt-2 bg-input p-[17px] shadow-inner  w-full h-11 rounded-md"
                    id="jam_pelajaran"
                    name="jam"
                    value={newData.jam}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Isi Jam Pelajaran"
                  />
                </div>
                <div className="mb-20">
                  <input
                    id="waktu"
                    className="mt-2 bg-input p-[17px] shadow-inner w-full h-11 rounded-md"
                    type="time"
                    name="waktu"
                    value={newData.waktu}
                    onChange={handleInputChange}
                    placeholder="Isi Waktu"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-3">
              <Button
                type="submit"
                className="border-none bg-merah text-white rounded-md w-48 h-12 shadow-xs hover:bg-red-800 transition duration-200"
              >
                Simpan
              </Button>
              <Button
                className=" bg-white  text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
                onClick={handleBack}
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TambahWaktu;