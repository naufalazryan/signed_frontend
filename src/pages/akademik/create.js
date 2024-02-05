import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Layout from "@/components/Layout";
import SaveButton from "@/components/button/Save";
import ToggleStatus from "@/components/switcher/ToggleStatus";
import { Button } from "@nextui-org/react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FaCalendarAlt } from "react-icons/fa";

const TambahAkademik = () => {
  const router = useRouter();

  const [newData, setNewData] = useState({
    kegiatan: "",
    tanggal_mulai: "",
    tanggal_selesai: null,
    status: 0,
  });

  const handleInputChange = (value, name) => {
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
        "https://api.e1.ikma.my.id/api/admin/akademik/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/akademik");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/akademik");
  };

  const CustomDatePickerInput = (props, openCalendar, closeCalendar) => {
    const handleIconClick = () => {
      openCalendar();
    };

    return (
      <div className="block">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FaCalendarAlt
            className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={handleIconClick}
          />
        </div>
        <input {...props} />
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Akademik</title>
      </Head>
      <div className="max-w-screen-lg w-screen h-full">
        <h1 className="text-2xl font-bold text-center">TAMBAH AKADEMIK</h1>
        <div className="mt-8">
          <form
            className="max-w-md mx-auto items-center mt-24"
            onSubmit={handleSubmit}
          >
            <div className="grid items-center">
              <div>
                <div className="mb-4">
                  <input
                    className="w-full bg-input p-[17px] text-sm shadow-inner h-11 rounded-md"
                    type="text"
                    id="nama_kegiatan"
                    name="kegiatan"
                    value={newData.kegiatan}
                    onChange={(e) => handleInputChange(e.target.value, "kegiatan")}
                    placeholder="Isi Nama Kegiatan"
                  />
                </div>
                <div className="flex justify-center items-center gap-5">
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Jadwal Mulai
                    </label>
                    <Datetime
                      inputProps={{
                        className:
                          "bg-sidebar text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 shadow-inner",
                        placeholder: "Pilih Jadwal Mulai",
                      }}
                      renderInput={CustomDatePickerInput}
                      onChange={(date) => handleInputChange(date.format("YYYY-MM-DD"), "tanggal_mulai")}
                      timeFormat={false}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Jadwal Selesai
                    </label>
                    <Datetime
                      inputProps={{
                        className:
                          "bg-sidebar text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 shadow-inner",
                        placeholder: "Pilih Jadwal Selesai",
                      }}
                      renderInput={CustomDatePickerInput}
                      onChange={(date) => handleInputChange(date.format("YYYY-MM-DD"), "tanggal_selesai")}
                      timeFormat={false}
                    />
                  </div>
                </div>

                <div className="mb-14 flex justify-start items-center">
                  <ToggleStatus
                    value={newData.status}
                    onChange={(value) =>
                      setNewData((prevData) => ({ ...prevData, status: value }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-3">
              <SaveButton type="submit" />
              <Button
                className="bg-white text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
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

export default TambahAkademik;