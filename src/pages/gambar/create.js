import React, { useRef, useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import { TfiExport } from "react-icons/tfi";
import CancelButton from "@/components/button/Cancel";
import UploadButton from "@/components/button/Upload";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const TambahGambar = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [namaGambar, setNamaGambar] = useState("");
  const router = useRouter();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file); // Log the selected file
    setSelectedFile(file);
  };

  const handleNamaGambarChange = (e) => {
    const value = e.target.value;
    console.log("Nama Gambar Value:", value); // Log the value of Nama Gambar
    setNamaGambar(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const formData = new FormData();
      formData.append("gambar", selectedFile);
      formData.append("nama_gambar", namaGambar);

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      // Convert FormData to a plain object for logging
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      console.log("Form Data:", formDataObject); // Log the converted form data

      await axios.post(
        "https://api.e1.ikma.my.id/api/admin/images/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully!");

      router.push("/gambar");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/gambar");
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Gambar</title>
      </Head>
      <div className="mb-96 max-w-screen-lg w-screen"></div>
      <form
        onSubmit={handleSubmit}
        className="absolute w-screen flex items-center justify-center h-screen mt-6"
      >
        <div className="flex flex-col w-full max-w-3xl p-8 rounded-md">
          <p className="text-abuTua text-xs mb-2 mt-8 text-end">
            Max: 50 MB. Format PNG, JPG, JPEG
          </p>
          <div className="mb-4 max-w-4xl w-full p-5 bg-input rounded-lg h-52">
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width={100}
                height={100}
                className="w-full h-full object-contain border-gray-300 rounded-md"
              />
            )}
          </div>
          <label
            htmlFor="file_input"
            className="w-full h-14 mt-10 border-[1px] bg-input border-gray-500 border-dashed border-silver rounded-md text-center cursor-pointer"
          >
            <input
              type="file"
              id="file_input"
              name="file_input"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
              onClick={handleFileInputClick}
            />
            <div className="flex items-center justify-center mt-4">
              <TfiExport className="w-5 h-5 mr-2 cursor-pointer" />
              <p className="text-sm cursor-pointer">Upload Gambar</p>
            </div>
          </label>
          <div className="w-full flex flex-col items-start mt-6">
            <label className="text-left" htmlFor="nama_gambar">
              Nama Gambar
            </label>
            <input
              id="nama_gambar"
              name="nama_gambar"
              className="mt-2 bg-input p-[17px] shadow-inner border w-full h-10 rounded-md"
              type="text"
              placeholder="Nama Gambar"
              value={namaGambar}
              onChange={handleNamaGambarChange}
            />
          </div>
          <div className="mt-8 items-start flex gap-2 justify-start mr-auto">
            <UploadButton type="submit" />{" "}
            <Button
                className=" bg-white  text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
                onClick={handleBack}
              >
                Batal
              </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default TambahGambar;