import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Logo from "@/../../public/images/logo.png"
import { FaVolumeUp } from "react-icons/fa"
import axios from "axios"
import { useRouter } from "next/router"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { motion, useAnimation } from 'framer-motion'


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
    const data = [
      {
        kelas: "X",
        jadwal: [
          { jam: "1", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "2", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "3", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "4", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "5", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "6", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "7", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "8", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "9", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
          { jam: "10", a: "PWdPB", b: "PWdPB", c: "PWdPB", d: "PWdPB", e: "PWdPB", f: "PWdPB", g: "PWdPB" },
        ],
      },
      {
        kelas: "XI",
        jadwal: [
          { jam: "1", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "2", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "3", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "4", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "5", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "6", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "7", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "8", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "9", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
          { jam: "10", a: "PKK", b: "PKK", c: "PKK", d: "PKK", e: "PKK", f: "PKK", g: "PKK" },
        ],
      },
      {
        kelas: "XII",
        jadwal: [
          { jam: "1", a: "MTK", b: "MTK", c: "MTK", d: "MTK", e: "MTK", f: "MTK", g: "MTK" },
          { jam: "2", a: "MTK", b: "MTK", c: "MTK", d: "MTK", e: "MTK", f: "MTK", g: "MTK" },
          { jam: "3", a: "MTK", b: "MTK", c: "MTK", d: "MTK", e: "MTK", f: "MTK", g: "MTK" },
          { jam: "4", a: "MTK", b: "MTK", c: "MTK", d: "MTK", e: "MTK", f: "MTK", g: "MTK" },
          { jam: "5", a: "MTK", b: "MTK", c: "MTK", d: "MTK", e: "MTK", f: "MTK", g: "MTK" },
        ],
      },
    ];



    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height);
      };
  
      window.addEventListener('resize', handleResize);
  
      setIsFullScreen(window.innerHeight === screen.height);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  

    return (
      <div className="mx-5 justify-start overflow-hidden max-h-screen" style={{ height: isFullScreen ? '100vh' : 'auto' }}>
      <div className={`h-[520px] relative max-w-[994px] overflow-y-auto border-b sb-hidden`}>
        <table className="max-w-screen-md table-auto">
            <thead className="relative overflow-hidden z-10 ">
              <tr className="bg-merah text-white">
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center ">Kelas</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">Jam</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">A</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">B</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">C</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">D</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">E</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">F</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white text-center">G</th>
              </tr>
            </thead>
            <tbody className='marquee-animation'>
              {data.map((kelasData, kelasIndex) => (
                kelasData.jadwal.map((row, jamIndex) => (
                  <tr key={`${kelasIndex}-${jamIndex}`}>
                    {jamIndex === 0 && (
                      <td
                        rowSpan={kelasData.jadwal.length}
                        className={`py-2 px-8  text-center border-x border-b z-1 ${kelasData.kelas} ${kelasData.kelas === 'X' ? '' : ''
                          }`}
                      >
                        {kelasData.kelas}
                      </td>
                    )}
                    <td
                      className={`py-2 px-8 text-center border-r  z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.jam}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-r z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.a}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-r z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.b}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-r z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.c}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-r z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.d}
                    </td>
                    <td
                      className={`py-2 px-8 text-center  border-r z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.e}
                    </td>
                    <td
                      className={`py-2 px-8 text-center  border-r z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.f}
                    </td>
                    <td
                      className={`py-2 px-8 text-center border-r  z-1 ${kelasData.kelas === 'X' && jamIndex === 0 ? '' : ''
                        }`}
                    >
                      {row.g}
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

    return (
      <div className="grid grid-cols-3 grid-flow-col p-5 mb-10">
        <div className="text-black font-bold place-self-start text-xl">{formattedDateTime.date}</div>
        <Image src={Logo} alt="SMK Telkom Logo" className="w-32 place-self-center" />
        <div className="text-black font-bold place-self-end text-xl">{formattedDateTime.time}</div>
      </div>
    )
  }

  const Announce = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchData = useCallback(async () => {
      setIsLoading(true);
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
          );

          if (response.data && response.data.data) {
            const { data } = response.data;
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
    }, [token]);


    useEffect(() => {
      fetchData();

      const intervalId = setInterval(() => {
        setCurrentAnnouncementIndex(
          (prevIndex) => (prevIndex + 1) % data.length
        );
      }, 3 * 60 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, [token, data.length, fetchData]);

    const useInterval = (callback, delay) => {
      const savedCallback = useRef();

      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);

      useEffect(() => {
        const tick = () => {
          savedCallback.current();
        };

        if (delay !== null) {
          const id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
    };

    useInterval(() => {
      fetchData();
    }, 3 * 60 * 1000);

    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsFullScreen(window.innerHeight === screen.height);
      };

      window.addEventListener('resize', handleResize);

      setIsFullScreen(window.innerHeight === screen.height);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <div className="bg-merah text-white gap-3 text-center p-2 fixed bottom-0 w-full  flex items-center justify-center" style={{ height: isFullScreen ? '8vh' : 'auto' }}>
        <FaVolumeUp />
        {data.length > 0 && (
          <p className="text-md font-bold">
            {data[currentAnnouncementIndex].pengumuman}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className='w-screen h-screen overflow-x-hidden overflow-y-hidden'>
      <Navbar />
      <Table />
      <Announce />
    </div>
  );
});

Signed.displayName = 'Signed'

export default withAuth(Signed);