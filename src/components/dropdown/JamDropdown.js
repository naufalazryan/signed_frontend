import React, { useState, useRef, useEffect } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

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
    // Sesuaikan jumlah item yang terlihat saat ukuran window berubah
    const handleResize = () => {
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const { height } = dropdown.getBoundingClientRect();
        const itemHeight = 40;
        const newVisibleItems = Math.floor(height / itemHeight);
        setVisibleItems(newVisibleItems);
      }
    };

    handleResize(); // Penyesuaian awal

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
          <DropdownMenu  variant="faded" aria-label="Aksi Dinamis" className="max-h-40 overflow-y-auto">
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

export default JamDropdown
