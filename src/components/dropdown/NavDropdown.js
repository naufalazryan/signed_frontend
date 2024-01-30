import React from "react"
import { MdOutlineArrowDropDown } from "react-icons/md"
import { IoLogOutSharp } from "react-icons/io5"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

const NavDropdown = () => {
  const items = [
    {
      key: "keluar",
      label: "Keluar",
      icon: IoLogOutSharp
    }
  ]

  return (
    <div className={poppins.className}>
      <Dropdown className="border-none flex justify-center items-center w-full">
        <DropdownTrigger>
          <Button variant="faded">
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">

          <DropdownMenu variant="faded" aria-label="Dynamic Actions" items={items}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "keluar" ? "" : "default"}
                className={`${item.key === "keluar" ? "" : ""}`}
                href="/auth"
              >
                <div className='flex justify-center items-center gap-2 bg-sidebar shadow-md rounded-lg p-3 hover:bg-merah hover:text-white transition duration-300 ease-in-out'>

                  {item.icon && item.icon()}
                  <span className='mb-1 font-poppins'>{item.label}</span>
                </div>
              </DropdownItem>
            )}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  )
}


export default NavDropdown