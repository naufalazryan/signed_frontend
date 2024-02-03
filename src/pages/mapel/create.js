import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import SendButton from "@/components/button/Send";
import { Button } from "@nextui-org/react";

const TambahMapel = () => {
  const router = useRouter();

  const [newData, setNewData] = useState({
    nama: "",
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
        "https://api.e1.ikma.my.id/api/admin/mapel/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/mapel");
      }
    } catch (error) {
      if (error.response) {

        console.error("Error adding data:", error.response.data);

      } else if (error.request) {

        console.error("No response received from the server.");

      } else {

        console.error("Error setting up the request:", error.message);

      }
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/mapel");
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Mapel</title>
      </Head>
      <div className="max-w-screen-lg w-screen h-full">
        <h1 className="text-2xl font-bold text-center">TAMBAH MAPEL</h1>
        <div className="mt-8">
          <form
            className="max-w-md mx-auto items-center mt-24"
            onSubmit={handleSubmit}
          >
            <div className="grid items-center gap-x-5">
              <div>
                <div className="mb-20">
                  <div>
                    <label
                      htmlFor="mapel"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Mata Pelajaran
                    </label>
                    <input
                      className="w-full bg-input p-[17px] text-sm shadow-inner h-11 rounded-md"
                      type="text"
                      id="mapel"
                      name="nama"
                      value={newData.name}
                      onChange={handleInputChange}
                      placeholder="Isi Mata Pelajaran"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-3">
              <SendButton type="submit" value="" name="" />
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

export default TambahMapel;