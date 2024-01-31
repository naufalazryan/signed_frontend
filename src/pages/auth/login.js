import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Logo from "@/../../public/images/logo.png";
import InputSandi from "@/components/input/InputSandi";
import ButtonLogin from "@/components/button/ButtonLogin";
import InputNama from "@/components/input/InputNama";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api.e1.ikma.my.id/api/login",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("login:", response);

      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("username", response.data.data.user.username);
        localStorage.setItem("Authenticated", true);

        toast.success("Login Berhasil!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: "bounce",
        });

        // Redirect only on successful login
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error("Login Gagal! Terjadi kesalahan. Silakan coba lagi.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: "bounce",
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Login Gagal! Terjadi kesalahan. Silakan coba lagi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: "bounce",
      });
    } finally {
      // Use a setTimeout to simulate a 5-second delay for the loading indicator
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div>
      <Head>
        <title>Halaman Masuk</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-slate-100 text-black">
        <form
          className="w-full max-w-screen-xl mx-auto"
          onSubmit={loginHandler}
        >
          <div className="bg-white w-full md:w-[500px] xl:w-[900px] rounded-lg xl:h-[600px] shadow-lg h-[auto] p-8 mx-auto flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                src={Logo}
                className="w-full md:w-52 sm:w-40"
                alt="Logo"
                priority
              />
            </div>
            <div className="w-[80%] mt-10">
              <div className="mb-5">
                <div className="relative w-full flex items-center">
                  <FaUser className="absolute left-3 text-abuTua mt-2" />
                  <input
                    className="pl-10 mt-2 bg-sidebar p-[17px] shadow-inner w-full h-11 rounded-md"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nama Pengguna"
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="mb-16">
                <div className="relative w-full flex items-center">
                  <FaKey className="absolute left-3 text-abuTua mt-2" />
                  <input
                    className="pl-10 mt-2 bg-sidebar p-[17px] shadow-inner w-full h-11 rounded-md"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Kata Sandi"
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <div>
                <div className="max-w-screen-lg w-full">
                  <Button
                    className="border-none bg-merah text-white rounded-md w-full h-12 shadow-xs hover:bg-red-800 transition duration-200"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Masuk"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;