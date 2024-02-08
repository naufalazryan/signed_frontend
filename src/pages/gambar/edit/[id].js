import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import { TfiExport } from "react-icons/tfi";
import CancelButton from "@/components/button/Cancel";
import UploadButton from "@/components/button/Upload";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const EditGambar = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [gambarData, setGambarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nama_gambar, setNamaGambar] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();
  const { id } = router.query;
  const allowedFileTypes = ["image/png", "image/jpeg"];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.e1.ikma.my.id/api/images/get/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);

        // Fetch additional information including the name of the image
        const additionalInfoResponse = await axios.get(
          `https://api.e1.ikma.my.id/api/admin/images/get/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Additional Info Response:", additionalInfoResponse.data);

        if (additionalInfoResponse.status === 200) {
          const { message, data, nama_gambar } =
            additionalInfoResponse.data || {};

          if (message === "Successfully get data" && data) {
            const { nama_gambar } = data;

            console.log("Nama Gambar from Response:", nama_gambar);

            if (nama_gambar !== undefined && nama_gambar !== null) {
              // Set namaGambar state here
              setNamaGambar(nama_gambar);
              setGambarData({ url: imageUrl, data: response.data });
            } else {
              setError("Nama Gambar is undefined or null");
            }
          } else {
            setError("Invalid response structure");
          }
        } else {
          setError(
            `Failed to fetch additional image info. Status: ${additionalInfoResponse.status}`
          );
        }
      } else {
        setError(`Failed to fetch image data. Status: ${response.status}`);
      }
    } catch (error) {
      setError(`Error fetching image data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  useEffect(() => {
    if (selectedFile) {
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      const imageUrl = URL.createObjectURL(blob);
      setGambarData({ url: imageUrl, data: selectedFile });
    }
  }, [selectedFile]);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (
        allowedFileTypes.includes(file.type) ||
        file.type === "image/svg+xml"
      ) {
        setSelectedFile(file);
        setError(null);
      } else {
        setSelectedFile(null);
        setError(
          "Jenis file tidak valid. Harap unggah file dengan tipe PNG, JPEG, atau SVG."
        );
      }
    }
  };

  const handleNamaGambarChange = (e) => {
    setNamaGambar(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      if (selectedFile) {
        formData.append("gambar", selectedFile);
      }
  
      formData.append("nama_gambar", nama_gambar);
      formData.append("status", "1");
      formData.append("_method", "put");
  
      console.log("Data yang dikirim ke server:", formData);
  
      const response = await axios.post(
        `https://api.e1.ikma.my.id/api/admin/images/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
        console.log("Gambar berhasil diperbarui:", response.data);
        fetchData();
        setSelectedFile(null);
        setNamaGambar("");
  
        // Redirect to /gambar after successful update
        router.push("/gambar");
      } else {
        console.error("Gagal memperbarui gambar:", response.status);
      }
    } catch (error) {
      console.error("Error updating image:", error.message);
  
      if (error.response) {
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  

  return (
    <Layout>
      <Head>
        <title>Ubah Gambar</title>
      </Head>
      <div className="mb-96 max-w-screen-lg w-screen"></div>
      <form
        className="absolute w-screen flex items-center justify-center h-screen"
        onSubmit={handleUpdate}
      >
        <div className="flex flex-col w-full max-w-3xl p-8 rounded-md">
          <div className="mb-4 max-w-4xl w-full p-5 bg-input rounded-lg h-52">
            {gambarData && (
              <Image
                src={gambarData.url}
                alt="Preview"
                width={100}
                height={100}
                className="w-full h-full object-contain border-gray-300 rounded-md"
              />
            )}
          </div>
          <label
            htmlFor="file_input"
            className="w-full h-12 border-[1px] mt-2 bg-input border-gray-500 border-dashed border-silver rounded-md text-center cursor-pointer"
          >
            <input
              type="file"
              id="file_input"
              name="file_input"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg, image/svg"
              onChange={handleFileInputChange}
              onClick={handleFileInputClick}
            />
            <div className="flex items-center justify-center mt-4">
              <TfiExport className="w-4 h-4 mr-2 cursor-pointer" />
              <p className="text-xs cursor-pointer">Upload Gambar</p>
            </div>
          </label>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div className="w-full flex flex-col items-start mt-4">
            <label className="text-left" htmlFor="nama_gambar">
              Nama Gambar
            </label>
            <input
              id="nama_gambar"
              name="nama_gambar"
              className="mt-2 bg-input p-[17px] shadow-inner border w-full h-10 rounded-md"
              type="text"
              placeholder="Nama Gambar"
              value={nama_gambar || ""}
              onChange={handleNamaGambarChange}
            />
          </div>
          <div className="mt-8 items-start flex gap-2 justify-start mr-auto">
            <UploadButton type="submit" />
            <CancelButton />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default EditGambar;
