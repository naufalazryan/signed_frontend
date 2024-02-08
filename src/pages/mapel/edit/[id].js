import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const EditMapel = () => {
  const [nama, setNama] = useState("");
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
            `https://api.e1.ikma.my.id/api/admin/mapel/get/id/${id}`,
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
            setNama(data.nama);
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
          `https://api.e1.ikma.my.id/api/admin/mapel/update/${id}`,
          {
            nama,
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

      router.push("/mapel");
    } catch (error) {
      console.error("Error updating data:", error.message || error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nama") {
      setNama(value);
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/waktu");
  };
  return (
    <Layout>
      <Head>
        <title>Ubah Mapel</title>
      </Head>
      <div className="max-w-screen-lg w-screen h-full">
        <h1 className="text-2xl font-bold text-center">UBAH MAPEL</h1>
        <div className="mt-8">
          <form className="max-w-md mx-auto items-center mt-24" onSubmit={handleSubmit}>
            <div className="grid items-center gap-x-5">
              <div>
                <div className="mb-20">
                  <input
                    className="w-full bg-input p-[17px] text-sm shadow-inner h-11 rounded-md"
                    type="text"
                    id="mapel"
                    value={nama}
                    name="nama"
                    onChange={handleInputChange}
                    placeholder="Isi Mata Pelajaran"
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

export default EditMapel;