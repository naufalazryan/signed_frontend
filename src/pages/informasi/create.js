import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import SendButton from "@/components/button/Send";
import ToggleStatus from "@/components/switcher/ToggleStatus";
import { Button } from '@nextui-org/react'

const TambahInformasi = () => {
  const router = useRouter();

  const [newData, setNewData] = useState({
    pengumuman: "",
    status: 0,
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
        "https://api.e1.ikma.my.id/api/admin/info/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/informasi");
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
    router.push("/informasi");
  };
  const [announcement, setAnnouncement] = useState("");

  const textareaStyle = {
    width: "750px",
    height: "full",
    padding: "20px",

    border: "1px",
    borderRadius: "10px",
    fontSize: "16px",
    backgroundColor: "#f8f8f8",
    boxShadow: "inset 0 1px 3px 2px rgba(0,0,0,0.20)",
  };

  return (
    <Layout useContainer>
      <Head>
        <title>Tambah Informasi</title>
      </Head>
      <div className="max-w-screen-lg w-screen flex justify-center z-10  flex-col items-center">
        <h1 className="text-2xl font-bold mb-20 text-center">
          TAMBAH INFORMASI
        </h1>
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label className="ml-3 mb-3" htmlFor="pengumuman">
            Pengumuman
          </label>
          <textarea
            style={textareaStyle}
            value={newData.pengumuman}
            onChange={handleInputChange}
            placeholder="Isi Pengumuman"
            id="pengumuman"
            name="pengumuman"
            className=" mb-2 shadow-none bg-transparent"
            rows="3"
          />
          <div>
            <ToggleStatus
              value={newData.status}
              onChange={(value) =>
                setNewData((prevData) => ({ ...prevData, status: value }))
              }
            />
          </div>
          <div className="flex gap-3 ml-3 mt-10">
            <SendButton type="submit" value="" name="" />
            <Button className=" bg-white  text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
            onClick={handleBack}>
              Batal
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TambahInformasi;
