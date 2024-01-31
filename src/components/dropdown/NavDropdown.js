'use client'
import React, { useEffect } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useRouter } from "next/router";
import { IoLogOutSharp } from "react-icons/io5";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { Poppins } from "next/font/google";
import axios from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const logoutUser = async (router) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle the case where token is not available
      console.error("Token not available");
      return;
    }
    console.log("Token:", token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("https://api.e1.ikma.my.id/api/admin/logout");
    localStorage.clear();
    router.push("/auth/login");
  } catch (error) {
    console.error(error);
  }
};

const NavDropdown = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const items = [
    {
      key: "keluar",
      label: "Keluar",
      icon: IoLogOutSharp,
    },
  ];

  return (
    <div className={poppins.className}>
      <Dropdown className="border-none flex justify-center items-center w-full">
        <DropdownTrigger>
          <Button variant="faded">
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu
            variant="faded"
            aria-label="Dynamic Actions"
            items={items}
          >
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "keluar" ? "" : "default"}
                className={`${item.key === "keluar" ? "" : ""}`}
                onClick={() => logoutUser(router)}
              >
                <div className="flex justify-center items-center gap-2 bg-sidebar shadow-md rounded-lg p-3 hover:bg-merah hover:text-white transition duration-300 ease-in-out">
                  {item.icon && item.icon()}
                  <span className="mb-1 font-poppins">{item.label}</span>
                </div>
              </DropdownItem>
            )}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};

export default NavDropdown;