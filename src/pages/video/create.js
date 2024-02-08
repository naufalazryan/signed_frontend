import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import CancelButton from "@/components/button/Cancel";
import UploadButton from "@/components/button/Upload";
import { FaLink } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { Button } from "@nextui-org/react";

const TambahVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const router = useRouter();

  const [newData, setNewData] = useState({
    nama_video: "",
    url_video: "",
    status: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "url_video") {
      setVideoUrl(value);
    }
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
        "https://api.e1.ikma.my.id/api/admin/video/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/video");
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
    router.push("/mapel");
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Video</title>
      </Head>
      <div className="max-w-screen-lg w-screen flex items-center justify-center">
        <form className="w-full flex flex-col items-center max-w-3xl p-8 rounded-md" onSubmit={handleSubmit}>
          <div className="mb-4 w-full max-w-3xl h-80 bg-sidebar overflow-hidden rounded-lg">
            {videoUrl && (
              <div style={{ height: "100%" }}>
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}
          </div>
          <label
            htmlFor="tambah_url"
            className="w-full mt-2 border-2 bg-input border-gray-500 border-dashed rounded-sm text-center cursor-pointer"
          >
            <div className="flex items-center">
              <FaLink className="w-10" />
              <input
                type="url"
                name="url_video"
                id="tambah_url"
                value={newData.url_video}
                onChange={handleInputChange}
                className="w-full h-full p-2 bg-sidebar"
                placeholder="Masukkan URL Video"
              />
            </div>
          </label>

          <div className="w-full flex flex-col items-start mt-6">
            <label htmlFor="nama_video" className="text-left">
              Nama Video
            </label>
            <input
              className="mt-2 bg-sidebar p-[15px] shadow-inner-3 w-full h-14 rounded-lg"
              type="text"
              name="nama_video"
              id="nama_video"
              value={newData.nama_video}
              onChange={handleInputChange}
              placeholder="Nama Video"
            />
          </div>

          <div className="mt-8 items-start flex gap-2 justify-start mr-auto">
            <UploadButton />
            <Button
              className=" bg-white  text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
              onClick={handleBack}
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TambahVideo;
