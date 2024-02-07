import React, { useState, useRef, useEffect }  from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import CancelButton from '@/components/button/Cancel'
import HariDropdown from '@/components/dropdown/HariDropdown'
import SaveButton from '@/components/button/Save'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

const MapelDropdown = () => {
  const items = [
    { key: "mtk", label: "MTK" },
    { key: "bindo", label: "B INDO" },
    { key: "bing", label: "B ING" },
    { key: "pai", label: "PAI" },
    { key: "pkk", label: "PKK" },
    { key: "pwdpb", label: "PWdPB" },
    { key: "pbo", label: "PBO" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemLabel, setSelectedItemLabel] = useState("Mata Pelajaran");
  const [visibleItems, setVisibleItems] = useState(5);
  const dropdownRef = useRef(null);

  const handleItemClick = (item) => {
    setSelectedItemLabel(item.label);
  };

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const { height } = dropdown.getBoundingClientRect();
        const itemHeight = 40;
        const newVisibleItems = Math.floor(height / itemHeight);
        setVisibleItems(newVisibleItems);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={poppins.className}>
      <Dropdown className="border-none flex justify-center items-center w-full">
        <DropdownTrigger className='max-w-40 w-40 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md'>
          <Button variant="faded">
            <p className='text-center text-xs'>{selectedItemLabel}</p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu variant="faded" aria-label="Dynamic Actions" ref={dropdownRef} className="max-h-40 overflow-y-auto">
            {filteredItems.slice(0, visibleItems).map((item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "x" ? "" : "default"}
                className="bg-input shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item)}
              >
                <div className='max-w-40 w-40 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out'>
                  <span className='text-xs'>{item.label}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
}


const AngkatanDropdown = () => {
  const items = [
    { key: "x", label: "X" },
    { key: "xi", label: "XI" },
    { key: "xii", label: "XII" },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItemLabel, setSelectedItemLabel] = useState("Angkatan")

  const handleItemClick = (item) => {
    setSelectedItemLabel(item.label)
  }

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={poppins.className}>
      <Dropdown className="border-none flex justify-center items-center w-full">
        <DropdownTrigger className='max-w-36 w-36 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md'>
          <Button variant="faded">
            <p className='text-center text-xs'>{selectedItemLabel}</p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu variant="faded" aria-label="Dynamic Actions">
            {filteredItems.map((item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "x" ? "" : "default"}
                className="bg-input shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item)}
              >
                <div className='max-w-36 w-36 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out'>
                  <span className='text-xs'>{item.label}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  )
}

const JamDropdown = () => {
  const items = [
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6" },
    { key: "7", label: "7" },
    { key: "8", label: "8" },
    { key: "9", label: "9" },
    { key: "10", label: "10" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemLabel, setSelectedItemLabel] = useState("Jam");
  const [visibleItems, setVisibleItems] = useState(10);
  const dropdownRef = useRef(null);

  const handleItemClick = (item) => {
    setSelectedItemLabel(item.label);
  };

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const { height } = dropdown.getBoundingClientRect();
        const itemHeight = 40;
        const newVisibleItems = Math.floor(height / itemHeight);
        setVisibleItems(newVisibleItems);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={poppins.className}>
      <Dropdown ref={dropdownRef} className="border-none flex justify-center items-center w-full">
        <DropdownTrigger className='max-w-20 w-20 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md'>
          <Button variant="faded">
            <p className='text-center text-xs'>{selectedItemLabel}</p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu variant="faded" aria-label="Aksi Dinamis" className="max-h-40 overflow-y-auto">
            {filteredItems.slice(0, visibleItems).map((item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "x" ? "" : "default"}
                className="bg-input shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item)}
              >
                <div className='max-w-20 w-20 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out'>
                  <span className='text-xs'>{item.label}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
}



const TambahJadwal = () => {
  const [selectedAngkatan, setSelectedAngkatan] = React.useState('')

  return (
    <Layout>
      <Head>
        <title>Tambah Jadwal</title>
      </Head>
      <div className='max-w-screen-lg w-screen h-full flex flex-col justify-center items-center text-center'>
        <h1 className="mb-5 text-2xl font-bold">TAMBAH JADWAL</h1>
        <form className='mt-10'>
          <div className='mb-10 flex justify-start items-center'>
            <div className='flex justify-start gap-5 '>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Angkatan
                </label>
                <AngkatanDropdown name='' value='' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Jam
                </label>
                <JamDropdown name='' value='' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Hari
                </label>
                <HariDropdown name='' value='' />
              </div>
            </div>
          </div>

          <div className='flex justify-start items-center mb-6'>
            <div className=' items-center'>
              <div className='grid grid-cols-4 gap-x-5 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran A
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran B
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran C
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran D
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-start items-center mb-6'>
            <div className=' items-center'>
              <div className='grid grid-cols-4 gap-x-5 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran E
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran F
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mata Pelajaran G
                  </label>
                  <MapelDropdown name='' value='' />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center gap-3 mt-14'>
            <SaveButton />
            <CancelButton />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default TambahJadwal
