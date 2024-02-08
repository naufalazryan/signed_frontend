// pages/waktu/edit/[id].js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const EditWaktuPage = () => {
  const [jam, setJam] = useState("");
  const [waktu, setWaktu] = useState("");
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
            `https://api.e1.ikma.my.id/api/admin/jam/get/id/${id}`,
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
            setJam(data.jam);
            setWaktu(data.waktu);
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
          `https://api.e1.ikma.my.id/api/admin/jam/update/${id}`,
          {
            jam,
            waktu,
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

      // Navigate to /waktu after attempting the update
      router.push("/waktu");
    } catch (error) {
      console.error("Error updating data:", error.message || error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "jam") {
      setJam(value);
    } else if (name === "waktu") {
      setWaktu(value);
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/waktu");
  };

  return (
    <Layout>
      <Head>
        <title>Ubah Waktu</title>
      </Head>
      <div className="max-w-screen-lg w-screen h-full">
        <h1 className="text-2xl font-bold text-center">UBAH WAKTU</h1>
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
                    value={jam}
                    type="number"
                    onChange={handleInputChange}
                    placeholder="Isi Jam Pelajaran"
                  />
                </div>
                <div className="mb-20">
                  <input
                    id="waktu"
                    className="mt-2 bg-input p-[17px] shadow-inner w-full h-11 rounded-md"
                    type="time"
                    name="waktu"
                    value={waktu}
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

export default EditWaktuPage;