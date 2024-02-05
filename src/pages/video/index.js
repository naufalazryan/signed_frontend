import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/card/VideoCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { FaPlus, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Video = () => {
  const [isButtonOn, setIsButtonOn] = useState(false);
  const router = useRouter();

  const [data, setData] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/video/get/all",
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
            console.log("Data received from the API:", data);
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

  const handleButtonClick = () => {
    setIsButtonOn((prev) => !prev);
  };

  const handleCreateClick = () => {
    router.push("/video/create");
  };

  const handleEditClick = (itemId) => {
    router.push(`/video/edit/${itemId}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.e1.ikma.my.id/api/admin/video/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Video Berhasil Dihapus", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Error deleting resource");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <Layout>
      <Head>
        <title>Pengaturan Video</title>
      </Head>
      <div className="max-w-screen-lg mx-auto p-10">
        <div className="flex justify-between items-center p-10">
          <h1 className="text-2xl font-bold text-center mb-9">
            PENGATURAN VIDEO
          </h1>
          <div className="flex justify-center items-center">
            <a
              onClick={handleCreateClick}
              className="mb-10 bg-sidebar cursor-pointer p-4 rounded-lg flex items-center space-x-3 shadow shadow-gray-300 hover:bg-merah hover:text-white transition duration-300"
            >
              <FaPlus />
              <span className="cursor-pointer">Tambah</span>
            </a>
          </div>
        </div>
        {data.length > 0 && (
          <Slider {...settings}>
            {data.map((video) => (
              <div key={video.id} className="mb-40 ml-12">
                <div
                  className={`group relative cursor-pointer items-center w-60 justify-center  overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/ rounded-lg ${
                    isButtonOn ? "" : ""
                  }`}
                >
                  <div className="h-full w-60">
                    <ReactPlayer
                      url={video.url_video}
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                  <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-4 text-center transition-all duration-500 group-hover:translate-y-0">
                    <h1 className="text-xs font-bold text-white mb-10 mt-10">
                      {video.nama_video}
                    </h1>
                    <div className="flex mt-1 justify-center space-x-2 mb-5">
                      <button
                        className="text-white hover:text-merah transition duration-200 p-5 rounded"
                        onClick={() => handleEditClick(video.id)}
                        title="Edit Video"
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-white hover:text-merah transition duration-200 p-5 rounded"
                        onClick={() => handleDelete(video.id)}
                        title="Delete Video"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <ToastContainer className="mt-12" />
    </Layout>
  );
};

export default Video;