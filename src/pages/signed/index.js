import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "@/../../public/images/logo.png";
import { FaVolumeUp } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    }, [router, token]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

const Signed = () => {
  const Table = () => {
    const data = [
      {
        kelas: "X",
        jadwal: [
          { jam: "1", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "2", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "3", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "4", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
        ],
      },
      {
        kelas: "XI",
        jadwal: [
          { jam: "1", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "2", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "3", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "4", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
        ],
      },
      {
        kelas: "XII",
        jadwal: [
          { jam: "1", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "2", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "3", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
          { jam: "4", a: "Data", b: "Data", c: "Data", d: "Data", e: "Data", f: "Data", g: "Data" },
        ],
      },
    ];

    const tableRef = useRef(null);

    useEffect(() => {
      const handleScroll = () => {
        if (tableRef.current) {
          const { clientHeight, scrollHeight, scrollTop } = tableRef.current;
          const shouldAutoScroll = scrollHeight - scrollTop <= clientHeight + 10;
          if (shouldAutoScroll) {
            tableRef.current.scrollTop = scrollHeight - clientHeight;
          }
        }
      };

      if (tableRef.current) {
        tableRef.current.addEventListener('scroll', handleScroll);
      }

      return () => {
        const currentRef = tableRef.current;
        if (currentRef) {
          currentRef.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);


    return (
      <div className="mx-5 my-4 justify-start overflow-auto">
        <div className="max-h-screen rounded-tl-xl rounded-bl-xl overflow-y-auto sb-hidden" ref={tableRef}>
          <table className="border-collapse table-auto text-center">
            <thead className='relative'>
              <tr className="bg-merah text-white">
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">Kelas</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">Jam</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">A</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">B</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">C</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">D</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">E</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">F</th>
                <th className="py-2 px-9 sticky top-0 bg-merah text-white">G</th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {data.map((kelasData, kelasIndex) => (
                kelasData.jadwal.map((row, jamIndex) => (
                  <tr key={`${kelasIndex}-${jamIndex}`}>
                    {jamIndex === 0 && (
                      <td rowSpan={kelasData.jadwal.length} className="py-2 px-9 border">{kelasData.kelas}</td>
                    )}
                    <td className="py-2 px-9 border">{row.jam}</td>
                    <td className="py-2 px-9 border">{row.a}</td>
                    <td className="py-2 px-9 border">{row.b}</td>
                    <td className="py-2 px-9 border">{row.c}</td>
                    <td className="py-2 px-9 border">{row.d}</td>
                    <td className="py-2 px-9 border">{row.e}</td>
                    <td className="py-2 px-9 border">{row.f}</td>
                    <td className="py-2 px-9 border">{row.g}</td>
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
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const formatDateTime = (date) => {
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };

      const dateString = date.toLocaleString("id-ID", dateOptions);
      const timeString = date.toLocaleString("id-ID", timeOptions);

      return {
        date: dateString,
        time: timeString,
      };
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    const formattedDateTime = formatDateTime(currentDateTime);

    return (
      <div className="grid grid-cols-3 grid-flow-col p-5">
        <div className="text-black font-bold place-self-start text-xl">{formattedDateTime.date}</div>
        <Image src={Logo} alt="SMK Telkom Logo" className="w-32 place-self-center" />
        <div className="text-black font-bold place-self-end text-xl">{formattedDateTime.time}</div>
      </div>
    );
  };

  const Announce = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchData =  async () => {
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
    };

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

    return (
      <div className="bg-merah text-white text-center p-2 fixed bottom-0 left-0 w-full flex items-center justify-center">
        <FaVolumeUp className="mr-5" />
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
};

Signed.displayName = 'Signed';

export default withAuth(Signed);