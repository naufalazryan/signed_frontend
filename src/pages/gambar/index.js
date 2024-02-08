import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "@/components/Layout";
import PosterCard from "@/components/card/PosterCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gambar = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [isButtonOn, setIsButtonOn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/images/get/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response from the API:", response);

          if (response.data && response.data.data) {
            const { data } = response.data;
            console.log("Fetched data:", data);
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

  const handleButtonClick = () => {
    setIsButtonOn((prev) => !prev);
  };

  const handleCreateClick = () => {
    router.push("/gambar/create");
  };

  const handleEditClick = (itemId) => {
    router.push(`/gambar/edit/${itemId}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.e1.ikma.my.id/api/admin/images/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Gambar Berhasil Dihapus!", {
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <Layout>
      <Head>
        <title>Pengaturan Gambar</title>
      </Head>
      <div className="max-w-screen-lg mx-auto p-10">
        <div className="flex justify-between items-center mx-[60px]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-3xl font-bold mb-10 text-center">
            PENGATURAN GAMBAR
          </h1>

          <div className="flex justify-center items-center">
            <a
              onClick={handleCreateClick}
              title="Click Me"
              className="mb-10 bg-sidebar cursor-pointer p-4 rounded-lg flex items-center space-x-3 shadow shadow-gray-300 hover:bg-merah hover:text-white transition duration-300"
            >
              <FaPlus />
              <span className="cursor-pointer">Tambah</span>
            </a>
          </div>
        </div>
        <Slider {...settings}>
          {data.map((gambar) => (
            <div key={gambar.id} className="mb-28">
              {console.log("Data dari API Gambarnya:", gambar)}
              <PosterCard
                id={gambar.id}
                imageUrl={`https://api.e1.ikma.my.id/api/images/get/id/${gambar.id}`}
                nama_gambar={gambar.nama_gambar || "No Name"}
                onEdit={() => handleEditClick(gambar.id)}
                onDelete={() => handleDelete(gambar.id)}
              />
            </div>
          ))}
        </Slider>
      </div>
      <ToastContainer className="mt-12" />
    </Layout>
  );
};

export default Gambar;
