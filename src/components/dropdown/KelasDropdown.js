import React, { useState } from "react"
import { MdOutlineArrowDropDown } from "react-icons/md"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, Input } from "@nextui-org/react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

const KelasDropdown =() => {
  const items = [
    { key: "a", label: "A" },
    { key: "b", label: "B" },
    { key: "c", label: "C" },
    { key: "d", label: "D" },
    { key: "e", label: "E" },
    { key: "f", label: "F" },
    { key: "g", label: "G" },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItemLabel, setSelectedItemLabel] = useState("Nama Kelas")

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

export default KelasDropdown