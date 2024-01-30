import React, { useState, useEffect, useRef, useCallback } from "react"
import Script from "next/script"
import Image from "next/image"
import Logo from "@/../../public/images/logo.png"
import { Poppins } from "next/font/google"
import { FaVolumeUp } from "react-icons/fa"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Signed = () => {

  const Table = () => {
    const data = [
      {
        kelas: "X",
        jam: "1",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "X",
        jam: "2",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "X",
        jam: "3",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "X",
        jam: "4",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "X",
        jam: "5",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XI",
        jam: "1",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XI",
        jam: "2",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XI",
        jam: "3",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XI",
        jam: "4",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XI",
        jam: "5",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XII",
        jam: "1",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XII",
        jam: "2",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XII",
        jam: "3",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XII",
        jam: "4",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
      },
      {
        kelas: "XII",
        jam: "5",
        a: "Data",
        b: "Data",
        c: "Data",
        d: "Data",
        e: "Data",
        f: "Data",
        g: "Data",
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
  
      // Cleanup the event listener when the component is unmounted
      return () => {
        if (tableRef.current) {
          tableRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }, [data]);



    return (
      <div className="mx-5 my-4 justify-start overflow-auto">
        <div className="max-h-screen rounded-tl-xl rounded-bl-xl overflow-y-auto sb-hidden"  ref={tableRef}>
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
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-9 border">{row.kelas}</td>
                  <td className="py-2 px-9 border">{row.jam}</td>
                  <td className="py-2 px-9 border">{row.a}</td>
                  <td className="py-2 px-9 border">{row.b}</td>
                  <td className="py-2 px-9 border">{row.c}</td>
                  <td className="py-2 px-9 border">{row.d}</td>
                  <td className="py-2 px-9 border">{row.e}</td>
                  <td className="py-2 px-9 border">{row.f}</td>
                  <td className="py-2 px-9 border">{row.g}</td>
                </tr>
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
    return (
      <div className="bg-merah text-white text-center p-2  fixed bottom-0 left-0 w-full flex items-center justify-center">
        <FaVolumeUp className="mr-5" />
        <p className='text-md font-bold'>Pengumuman</p>
      </div>
    );
  };



  return (
    <div className='w-screen h-screen overflow-x-hidden overflow-y-hidden'>
      <Navbar />
      <Table />
      <Announce />
    </div>
  )
}

export default Signed