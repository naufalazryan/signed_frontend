import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import CancelButton from "@/components/button/Cancel";
import UploadButton from "@/components/button/Upload";
import ReactPlayer from "react-player/youtube";
import { Button } from "@nextui-org/react";
import { FaLink } from "react-icons/fa";

const EditVideo = () => {
  const [nama_video, setNama] = useState("");
  const [url_video, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token && id) {
          const response = await axios.get(
            `https://api.e1.ikma.my.id/api/admin/video/get/id/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response data:", response.data);

          if (response.data && response.data.data) {
            const { data } = response.data;
            setNama(data.nama_video);
            setUrl(data.url_video);
          } else {
            console.error("Invalid data format in the response:", response);
            console.log("Data not found for ID:", id);
          }
        } else {
          console.warn(
            "Token or id is not available. User may not be authenticated or id is missing."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (token && id) {
        const response = await axios.put(
          `https://api.e1.ikma.my.id/api/admin/video/update/${id}`,
          {
            nama_video,
            url_video
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Update response:", response);

        if (response.data) {
          if (response.data.success) {
            console.log("Data updated successfully");
          } else {
            console.error("Failed to update data:", response.data.message);
          }
        } else {
          console.error("Invalid response format:", response);
        }
      } else {
        console.warn(
          "Token or id is not available. User may not be authenticated or id is missing."
        );
      }

      router.push("/video");
    } catch (error) {
      console.error("Error updating data:", error.message || error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "nama_video") {
      setNama(value);
    } else if (name === "url_video") {
      setUrl(value);
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/video");
  };

  return (
    <Layout>
      <Head>
        <title>Ubah Video</title>
      </Head>
      <div className="max-w-screen-lg w-screen flex items-center justify-center">
        <form
          className="w-full flex flex-col items-center max-w-3xl p-8 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-full max-w-3xl h-80 bg-sidebar overflow-hidden rounded-lg">
            {url_video && (
              <div style={{ height: "100%" }}>
                <ReactPlayer
                  url={url_video}
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
                value={url_video}
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
              value={nama_video}
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

export default EditVideo;