import React, { useState, useEffect, useRef, useCallback } from "react"
import { FaVolumeUp } from "react-icons/fa"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Logo from '../../../public/images/logo.png'
import Head from "next/head"
import chroma from "chroma-js"
import { Button } from "@nextui-org/react"
import 'swiper/css'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/swiper-bundle.css'
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Poster from '../../../public/images/poster.jpeg'
import Poster2 from '../../../public/images/poster2.jpg'
import Poster3 from '../../../public/images/poster3.jpeg'
import ReactPlayer from "react-player"
import moment from "moment"
import "moment/locale/id";


const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
      if (token) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.push('/auth/login')
      }
    }, [router, token])

    return isAuthenticated ? <WrappedComponent {...props} /> : null
  }
}

const Signed = React.memo(() => {


  const Table = () => {

    const [data, setData] = useState([]);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        console.log("Fetching data...");
        try {
          if (token) {

            const currentDay = new Date().toLocaleString("id-ID", {
              timeZone: "Asia/Makassar",
              weekday: "long",
            });

            const response = await axios.get(
              `https://api.e1.ikma.my.id/api/admin/jadwal/get/hari/${currentDay.toLowerCase()}`,
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

              console.log("Fetched data - kelas:", data.kelas);
              console.log("Fetched data - jadwal:", data.jadwal);

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
        }
      };

      fetchData();
    }, [token]);


    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isAnimatingUp, setIsAnimatingUp] = useState(false);
    const tableContainerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const getStoredColor = () => {
      return localStorage.getItem("selectedColorTable") || "#AC2427";
    };

    const storeColor = (color) => {
      localStorage.setItem("selectedColorTable", color);
    };

    const resetToDefaultColor = () => {
      const defaultColor = "#AC2427";
      setColor1(defaultColor);
      setLabelColor1(determineLabelColor(defaultColor));
      storeColor(defaultColor);
      closeModal();
    };

    const [color1, setColor1] = useState(getStoredColor());
    const [labelColor1, setLabelColor1] = useState(null);
    const inputColorRef1 = useRef(null);

    const determineLabelColor = (backgroundColor) => {
      const contrastColor =
        chroma.contrast(backgroundColor, "black") >
          chroma.contrast(backgroundColor, "white")
          ? "black"
          : "white";
      return contrastColor;
    };

    const handleColorChange =
      (setColor, setColorState, setLabelColor) => (event) => {
        const color = event.target.value;
        setColor(color);
        setColorState(color);
        setLabelColor(determineLabelColor(color));
        storeColor(color);
      };

    const createHandleDivClick =
      (inputColorRef, setColor, setLabelColor, currentColor) => () => {
        inputColorRef.current.click();
        setColor(currentColor);
        setLabelColor(determineLabelColor(currentColor));
      };

    useEffect(() => {
      const handleResize = () => {
        const newIsFullScreen = window.innerHeight === screen.height;
        setIsAnimatingUp(isFullScreen && !newIsFullScreen);
        setIsFullScreen(newIsFullScreen);
      };

      window.addEventListener("resize", handleResize);

      setIsFullScreen(window.innerHeight === screen.height);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isFullScreen]);

    useEffect(() => {
      const $container = tableContainerRef.current;
      let up = false;
      let lastPosition = 0;

      const interval = setInterval(() => {
        const position = $container.scrollTop;
        const height = $container.scrollHeight;

        if (position === lastPosition) up = !up;
        lastPosition = position;

        if (up) {
          $container.scrollTop = position - 1;
        } else {
          $container.scrollTop = position + 1;
        }
      }, 20);

      return () => clearInterval(interval);
    }, [isAnimatingUp]);

    useEffect(() => {
      const $container = tableContainerRef.current;

      if (isFullScreen) {
        $container.style.height = "630px";
      } else {
        $container.style.height = "600px";
      }
    }, [isFullScreen]);

    useEffect(() => {
      setColor1(getStoredColor());
      setLabelColor1(determineLabelColor(getStoredColor()));
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      const handleResize = () => {
        const newIsFullScreen = window.innerHeight === screen.height;
        setIsAnimatingUp(isFullScreen && !newIsFullScreen);
        setIsFullScreen(newIsFullScreen);
      };

      window.addEventListener("resize", handleResize);

      setIsFullScreen(window.innerHeight === screen.height);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isFullScreen]);

    useEffect(() => {
      const $container = tableContainerRef.current;
      let up = false;
      let lastPosition = 0;

      const interval = setInterval(() => {
        const position = $container.scrollTop;
        const height = $container.scrollHeight;

        if (position === lastPosition) up = !up;
        lastPosition = position;

        if (up) {
          $container.scrollTop = position - 1;
        } else {
          $container.scrollTop = position + 1;
        }
      }, 30);

      return () => clearInterval(interval);
    }, [isAnimatingUp]);

    useEffect(() => {
      const $container = tableContainerRef.current;

      if (isFullScreen) {
        $container.style.height = "630px";
      } else {
        $container.style.height = "600px";
      }
    }, [isFullScreen]);

    useEffect(() => {
      const handleResize = () => {
        const newIsFullScreen = window.innerHeight === screen.height;
        setIsAnimatingUp(isFullScreen && !newIsFullScreen);
        setIsFullScreen(newIsFullScreen);
      };

      window.addEventListener("resize", handleResize);

      setIsFullScreen(window.innerHeight === screen.height);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isFullScreen]);

    useEffect(() => {
      const $container = tableContainerRef.current;
      let up = false;
      let lastPosition = 0;

      const interval = setInterval(() => {
        const position = $container.scrollTop;
        const height = $container.scrollHeight;

        if (position === lastPosition) up = !up;
        lastPosition = position;

        if (up) {
          $container.scrollTop = position - 1;
        } else {
          $container.scrollTop = position + 1;
        }
      }, 25);

      return () => clearInterval(interval);
    }, [isAnimatingUp]);

    useEffect(() => {
      const $container = tableContainerRef.current;

      if (isFullScreen) {
        $container.style.height = "630px";
      } else {
        $container.style.height = "600px";
      }
    }, [isFullScreen]);

    const [prevKelas, setPrevKelas] = useState(null);

    const groupedData = data.reduce((acc, kelasData) => {
      const kelas = kelasData.kelas;

      if (!acc[kelas]) {
        acc[kelas] = [kelasData];
      } else {
        acc[kelas].push(kelasData);
      }

      return acc;
    }, {});

    return (
      <div className="justify-center w-full md:w-full overflow-hidden max-h-screen">
        <div
          className={`relative overflow-y-auto sb-hidden border-gray-300  `}
          ref={tableContainerRef}
        >
          <table className="table-auto w-full">
            {isColorPickerOpen && (
              <button onClick={openModal} className="hidden">
                Open Reset Modal
              </button>
            )}
            {isModalOpen && (
              <div
                className="fixed top-0  w-full h-full flex items-center justify-center"
                onClick={closeModal}
              >
                <div
                  className="bg-white px-10 py-8  border shadow-container text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <p className="text-sm">Apakah Anda Ingin Reset</p>
                    <p className="text-sm">Warna Latar Kelas Tabel?</p>
                  </div>
                  <div className="flex justify-center items-center gap-3 mt-10">
                    <Button
                      className="border-none bg-merah text-white rounded-md w-20 h-10 shadow-xs hover:bg-red-800 transition duration-200"
                      onClick={resetToDefaultColor}
                    >
                      Reset
                    </Button>
                    <Button
                      className=" bg-white text-black rounded-md w-20 h-10 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
                      onClick={closeModal}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <thead className="relative overflow-hidden z-10 rounded-t-sm">
              <tr onClick={openModal}>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white rounded-tl-sm"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  Kelas
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  Jam
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  A
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  B
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  C
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  D
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  E
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  F
                </th>
                <th
                  className="py-2 px-9 sticky top-0 text-center text-white rounded-tr-sm"
                  style={{ background: color1, color: labelColor1 }}
                >
                  <input
                    ref={inputColorRef1}
                    type="color"
                    value={color1}
                    name="bg_1"
                    id="bg_1"
                    onChange={handleColorChange(
                      setColor1,
                      setColor1,
                      setLabelColor1
                    )}
                    className="bg-none cursor-pointer absolute w-full h-full opacity-0"
                  />
                  G
                </th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(groupedData).map(([kelas, rows], kelasIndex) => (
                rows.map((kelasData, rowIndex) => (
                  <tr key={`${kelas}_${rowIndex}`} className={`border-black ${kelas}`}>
                    {rowIndex === 0 && (
                      <td
                        rowSpan={rows.length}
                        className={`py-2 px-8 text-center border-gray-300 border z-1 bg-gray-90 text-black`}
                      >
                        {kelas}
                      </td>
                    )}
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jam}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_a}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_b}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_c}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_d}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_e}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_f}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-gray-300 border bg-gray-90 z-1`}
                    >
                      {kelasData.jadwal_g}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };




  const SignedCard = () => {

    const [isFullScreen, setIsFullScreen] = useState(false)


    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height)
      }

      window.addEventListener('resize', handleResize)

      setIsFullScreen(window.innerHeight === screen.height)

      return () => {
        window.removeEventListener('resize', handleResize)
      }

    }, [])


    return (
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper shadow-container"

          style={{ maxWidth: '160px', maxHeight: '243px' }}
        >
          <SwiperSlide>
            <Image src={Poster} style={{ width: '100%', height: '100%' }} className='rounded-lg' />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Poster2} style={{ width: '100%', height: '100%' }} className='rounded-lg' />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Poster3} style={{ width: '100%', height: '100%' }} className='rounded-lg' />
          </SwiperSlide>
        </Swiper>
      </>
    );
  };
  const SignedCard2 = () => {

    const [isFullScreen, setIsFullScreen] = useState(false)


    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height)
      }

      window.addEventListener('resize', handleResize)

      setIsFullScreen(window.innerHeight === screen.height)

      return () => {
        window.removeEventListener('resize', handleResize)
      }

    }, [])


    return (
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper shadow-container"

          style={{ maxWidth: '160px', maxHeight: '243px' }}
        >
          <SwiperSlide>
            <Image src={Poster} style={{ width: '100%', height: '100%' }} className='rounded-lg' />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Poster2} style={{ width: '100%', height: '100%' }} className='rounded-lg' />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Poster3} style={{ width: '100%', height: '100%' }} className='rounded-lg' />
          </SwiperSlide>
        </Swiper>
      </>
    );
  };


  const Navbar = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date())

    const formatDateTime = (date) => {
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }

      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }

      const dateString = date.toLocaleString("id-ID", dateOptions)
      const timeString = date.toLocaleString("id-ID", timeOptions)

      return {
        date: dateString,
        time: timeString,
      }
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date())
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }, [])

    const formattedDateTime = formatDateTime(currentDateTime)
    const [isFullScreen, setIsFullScreen] = useState(window.innerHeight === screen.height);
    const [extraMarginBottom, setExtraMarginBottom] = useState(isFullScreen ? 50 : 0);

    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height);
        setExtraMarginBottom(isFullScreen ? 50 : 0);
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [isFullScreen]);

    return (
      <nav className="grid grid-cols-5 place-items-center justify-between h-20" style={{ marginBottom: `${extraMarginBottom}px` }}>
        <p className="text-black font-bold text-xl">{formattedDateTime.date}</p>
        <div className="flex justify-center col-span-3">
          <Image width={150} height={10} src={Logo} alt="logo" priority />
        </div>
        <p className="text-black font-bold text-3xl">{formattedDateTime.time}</p>
      </nav>
    );
  }

  const VideoPreview = () => {
    const [videoUrls, setVideoUrls] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0); const Navbar = () => {
      const [currentDateTime, setCurrentDateTime] = useState(new Date())

      const formatDateTime = (date) => {
        const dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }

        const timeOptions = {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        }

        const dateString = date.toLocaleString("id-ID", dateOptions)
        const timeString = date.toLocaleString("id-ID", timeOptions)

        return {
          date: dateString,
          time: timeString,
        }
      }

      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDateTime(new Date())
        }, 1000)

        return () => {
          clearInterval(intervalId)
        }
      }, [])

      const formattedDateTime = formatDateTime(currentDateTime)

      return (
        <nav className="grid grid-cols-5 place-items-center justify-between h-20">
          <p className="text-black font-bold text-xl">{formattedDateTime.date}</p>
          <div className="flex justify-center col-span-3">
            <Image width={150} height={10} src={Logo} alt="logo" priority />
          </div>
          <p className="text-black font-bold text-2xl">{formattedDateTime.time}</p>
        </nav>
      );
    }
    const [isLoading, setIsLoading] = useState(true);
    const playerRef = useRef(null);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

            if (response.data && Array.isArray(response.data.data)) {
              const { data } = response.data;
              setVideoUrls(data);
              console.log("Video URLs received from the API:", data);
            } else {
              console.error(
                "Invalid data format in the response:",
                response.data
              );
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

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    };

    return (
      <div className="w-full h-full bg-white border rounded-2xl border-gray-200 shadow-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : videoUrls && videoUrls.length > 0 ? (
          <div
            style={{
              position: "relative",
              paddingBottom: "53%",
              height: 0,
              overflow: "hidden",
              borderRadius: "15px",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              url={videoUrls[currentVideoIndex]?.url_video}
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "15px",
              }}
              controls={true}
              playing={true}
              onEnded={handleVideoEnd}
            />
          </div>
        ) : (
          <p>No videos available</p>
        )}
      </div>
    );
  };

  const AkademikCard = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [dataAkademik, setDataAkademik] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const router = useRouter();

    const fetchData = useCallback(async () => {
      setIsLoading(true);
      try {
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/akademik/get/on",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data && response.data.data) {
            const { data } = response.data;
            setDataAkademik(data);
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
    }, [token]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    useEffect(() => {
      if (tableRef.current) {
        const $container = tableRef.current;
        let up = false;

        const interval = setInterval(() => {
          const position = $container.scrollTop;
          const height = $container.scrollHeight;

          if (position === $container.lastPosition) up = !up;
          $container.lastPosition = position;

          if (up) {
            $container.scrollTop = position - 1;
          } else {
            $container.scrollTop = position + 1;
          }
        }, 30);

        return () => clearInterval(interval);
      }
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height);
      };

      window.addEventListener("resize", handleResize);

      setIsFullScreen(window.innerHeight === screen.height);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div
        className="bg-white border border-gray-300 rounded-lg shadow-sm md:flex-row md:max-w-xl max-h-32 p-3 sb-hidden hover:bg-gray-100 overflow-y-auto"
        style={{ height: isFullScreen ? "20vh" : "auto" }}
        ref={tableRef}
      >
        <div className="flex justify-center items-center p-3 leading-normal m-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="grid-flow-row text-center">
              <tbody className="w-full">
                {dataAkademik.map((akademik, index) => (
                  <React.Fragment key={index}>
                    <tr className="text-lg font-bold">
                      <td
                        className={`py-1 mb-5 ${akademik.tanggal_mulai && !akademik.tanggal_selesai
                          ? "mt-2"
                          : ""
                          }`}
                        colSpan="3"
                      >
                        {akademik.kegiatan}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          display: akademik.tanggal_mulai
                            ? "table-cell"
                            : "none",
                          textAlign: "center",
                        }}
                        className={`py-5`}
                        colSpan={akademik.tanggal_selesai ? "3" : "1"}
                      >
                        {akademik.tanggal_mulai &&
                          moment(akademik.tanggal_selesai).isValid() ? (
                          <>
                            {moment(akademik.tanggal_mulai).format("DD MMMM")}{" "}
                            -{" "}
                            {moment(akademik.tanggal_selesai).format(
                              "DD MMMM"
                            )}
                          </>
                        ) : (
                          moment(akademik.tanggal_mulai).format("DD MMMM")
                        )}
                      </td>
                    </tr>
                    {index < dataAkademik.length - 1 && (
                      <tr>
                        <td colSpan="3">
                          <hr className="border-t my-3 border-gray-300" />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  const HeaderInformasi = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const getStoredColor2 = () => localStorage.getItem('selectedColor2') || '#AC2427';

    const [color1, setColor1] = useState(getStoredColor2());
    const [labelColor1, setLabelColor1] = useState(null);
    const inputColorRef1 = useRef(null);

    const determineLabelColor = (backgroundColor) => {
      return chroma.contrast(backgroundColor, 'black') > chroma.contrast(backgroundColor, 'white') ? 'black' : 'white';
    };

    const storeColor1 = (color) => {
      localStorage.setItem('selectedColor2', color);
    };

    const resetToDefaultColor = () => {
      const defaultColor = '#AC2427';
      setColor1(defaultColor);
      setLabelColor1(determineLabelColor(defaultColor));
      storeColor1(defaultColor);
      closeModal();
    };

    const handleColorChange = (event) => {
      const color = event.target.value;
      setColor1(color);
      setLabelColor1(determineLabelColor(color));
      storeColor1(color);
      openColorPicker();
    };

    const openColorPicker = () => {
      setIsColorPickerOpen(true);
    };

    const closeColorPicker = () => {
      setIsColorPickerOpen(false);
    };

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const createHandleDivClick = () => {
      inputColorRef1.current.click();
      openColorPicker();
    };

    return (
      <table className="w-full h-full rounded">
        {isModalOpen && (
          <div className="fixed left-[650px] top-44 flex items-start justify-start z-3 bg-opacity-50" onClick={closeModal}>
            <div className="bg-white px-10 py-8 border shadow-container rounded-lg text-center" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-sm">Apakah Anda Ingin Reset</p>
                <p className="text-sm">Warna Latar Informasi?</p>
              </div>
              <div className="flex justify-center items-center gap-3 mt-10">
                <button className='border-none bg-merah text-white rounded-md w-20 h-10 shadow-xs hover:bg-red-800 transition duration-200' onClick={resetToDefaultColor}>
                  Reset
                </button>
                <button className='bg-white text-black rounded-md w-20 h-10 shadow-md border hover:bg-gray-50 transition duration-200 mb-1' onClick={closeModal}>
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
        <thead className="relative overflow-hidden z-10 ">
          <tr onClick={openModal}>
            <th className="py-2 px-9 sticky top-0 text-center  text-white rounded-sm" style={{ background: color1, color: labelColor1 }}>
              <input
                ref={inputColorRef1}
                type="color"
                value={color1}
                name='bg_1'
                id='bg_1'
                onChange={handleColorChange}
                className='bg-none cursor-pointer absolute w-full h-full opacity-0'
                style={{ left: '-20px' }}
              />
              Informasi
            </th>
          </tr>
        </thead>
      </table>
    );
  };




  const Announce = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const getStoredColor = () => {
      return localStorage.getItem('selectedColor') || '#AC2427'
    }

    const storeColor = (color) => {
      localStorage.setItem('selectedColor', color)
    }

    const resetToDefaultColor = () => {
      const defaultColor = '#AC2427'
      setColor1(defaultColor)
      setLabelColor1(determineLabelColor(defaultColor))
      storeColor(defaultColor)
      closeModal()
    }

    const [color1, setColor1] = useState(getStoredColor())
    const [labelColor1, setLabelColor1] = useState(null)

    const inputColorRef1 = useRef(null)


    const createHandleDivClick = (inputColorRef, setColor, setLabelColor, currentColor) => () => {
      inputColorRef.current.click()
      setColor(currentColor)
      setLabelColor(determineLabelColor(currentColor))
      storeColor(currentColor)
      openColorPicker()
    }

    const handleColorChange = (setColor, setColorState, setLabelColor) => (event) => {
      const colorPengumuman = event.target.value
      setColor(colorPengumuman)
      setColorState(colorPengumuman)
      setLabelColor(determineLabelColor(colorPengumuman))
      storeColor(colorPengumuman)
      openColorPicker()
    }

    const determineLabelColor = (backgroundColor) => {
      const contrastColor =
        chroma.contrast(backgroundColor, 'black') > chroma.contrast(backgroundColor, 'white')
          ? 'black'
          : 'white'
      return contrastColor
    }

    const openColorPicker = () => {
      setIsColorPickerOpen(true)
    }

    const closeColorPicker = () => {
      setIsColorPickerOpen(false)
    }

    const openModal = () => {
      setIsModalOpen(true)
    }

    const closeModal = () => {
      setIsModalOpen(false)
    }




    const fetchData = useCallback(async () => {
      setIsLoading(true)
      try {
        if (token) {
          const response = await axios.get(
            "https://api.e1.ikma.my.id/api/admin/info/get/on",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )

          if (response.data && response.data.data) {
            const { data } = response.data
            setData(data)
          } else {
            console.error("Invalid data format in the response:", response)
          }
        } else {
          console.warn(
            "Token is not available. User may not be authenticated."
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error.message || error)
      } finally {
        setIsLoading(false)
      }
    }, [token])


    useEffect(() => {
      fetchData()

      const intervalId = setInterval(() => {
        setCurrentAnnouncementIndex(
          (prevIndex) => (prevIndex + 1) % data.length
        )
      }, 3 * 60 * 1000)

      return () => {
        clearInterval(intervalId)
      }
    }, [token, data.length, fetchData])

    const useInterval = (callback, delay) => {
      const savedCallback = useRef()

      useEffect(() => {
        savedCallback.current = callback
      }, [callback])

      useEffect(() => {
        const tick = () => {
          savedCallback.current()
        }

        if (delay !== null) {
          const id = setInterval(tick, delay)
          return () => clearInterval(id)
        }
      }, [delay])
    }

    useInterval(() => {
      fetchData()
    }, 3 * 60 * 1000)

    const [isFullScreen, setIsFullScreen] = useState(false)

    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height)
      }

      window.addEventListener('resize', handleResize)

      setIsFullScreen(window.innerHeight === screen.height)

      return () => {
        window.removeEventListener('resize', handleResize)
      }

    }, [])

    return (
      <div>
        {isColorPickerOpen && (
          <button onClick={openModal} className="hidden">Open Reset Modal</button>
        )}
        {isModalOpen && (
          <div className="fixed top-0 w-full h-full flex items-center justify-center" onClick={closeModal}>
            <div className="bg-white px-10 py-8 border shadow-container rounded-lg text-center" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-sm">Apakah Anda Ingin Reset</p>
                <p className="text-sm">Warna Latar Pengumuman?</p>
              </div>
              <div className="flex justify-center items-center gap-3 mt-10">
                <Button className='border-none bg-merah text-white rounded-md w-20 h-10 shadow-xs hover:bg-red-800 transition duration-200' onClick={resetToDefaultColor}>
                  Reset
                </Button>
                <Button className=' bg-white text-black rounded-md w-20 h-10 shadow-md border hover:bg-gray-50 transition duration-200 mb-1' onClick={closeModal}>
                  Batal
                </Button>
              </div>
            </div>
          </div>
        )}
        <div onClick={openModal} className="p-2 fixed bottom-0 z-10 w-full text-white flex items-center justify-center" style={{ background: color1, color: labelColor1, height: isFullScreen ? '6vh' : 'auto' }}>
          <div className="flex justify-center items-center">
            <FaVolumeUp className="mr-2" />
            <div className="marquee-text w-full  flex-row">
              <input
                ref={inputColorRef1}
                type="color"
                value={color1}
                name='bg_1'
                id='bg_1'
                onChange={handleColorChange(setColor1, setColor1, setLabelColor1)}
                className='bg-none cursor-pointer absolute w-full h-full opacity-0'
              />
              {data.length > 0 && (
                <p className="text-md font-bold ml-2">
                  {data[currentAnnouncementIndex].pengumuman}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Signage SMK Telkom Banjarbaru</title>
      </Head>
      <div className='w-screen h-screen overflow-hidden flex flex-col sb-hidden'>
        <Navbar />
        <div className="flex justify-center gap-5">
          <div className="flex-3">
            <Table />
          </div>
          <div className="mr-2 flex flex-col">
            <div className="mb-2">
              <HeaderInformasi />
            </div>
            <div className="mb-2">
              <VideoPreview />
            </div>
            <div className="mb-2">
              <AkademikCard />
            </div>
            <div className="flex justify-center items-center top-0 gap-3">
              <SignedCard />
              <SignedCard2 />
            </div>
          </div>
        </div>
        <Announce />
      </div>
    </div>
  );

})


export default withAuth(Signed)