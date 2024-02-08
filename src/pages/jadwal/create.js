import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "@/components/Layout";
import CancelButton from "@/components/button/Cancel";
import SaveButton from "@/components/button/Save";
import { useRouter } from "next/router";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Poppins } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const MapelDropdown = ({ name, value, onChange }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(100);
  const dropdownRef = useRef(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onChange) {
      onChange(item);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.nama && item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.e1.ikma.my.id/api/admin/mapel/get/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (Array.isArray(response.data.data)) {
          setItems(response.data.data);
        } else {
          console.warn(
            "Invalid API response format. Using default empty array."
          );
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

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
        <DropdownTrigger className="max-w-40 w-40 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md">
          <Button variant="faded">
            <p className="text-center text-xs">
              {selectedItem ? selectedItem.nama : "Mata Pelajaran"}
            </p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu
            variant="faded"
            aria-label="Dynamic Actions"
            ref={dropdownRef}
            className="max-h-40 overflow-y-auto"
            direction="bottom"
          >
            {filteredItems.map((item) => (
              <DropdownItem
                key={item.id}
                color={item.key === "x" ? "" : "default"}
                className="bg-input shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item)}
              >
                <div className="max-w-40 w-40 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out">
                  <span className="text-xs">{item.nama}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};

const KelasDropdown = ({ name, value, onChange }) => {
  const items = [
    { kelas: "X", label: "X" },
    { kelas: "XI", label: "XI" },
    { kelas: "XII", label: "XII" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemLabel, setSelectedItemLabel] = useState("Kelas");

  const handleItemClick = (item) => {
    setSelectedItemLabel(item.label);
    if (onChange) {
      onChange(item.kelas);
    }
  };

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={poppins.className}>
      <Dropdown className="border-none flex justify-center items-center w-full">
        <DropdownTrigger className="max-w-36 w-36 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md">
          <Button variant="faded">
            <p className="text-center text-xs">{selectedItemLabel}</p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu variant="faded" aria-label="Dynamic Actions">
            {filteredItems.map((item) => (
              <DropdownItem
                key={item.kelas}
                color={item.key === "x" ? "" : "default"}
                className="bg-input shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item)}
              >
                <div className="max-w-36 w-36 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out">
                  <span className="text-xs">{item.label}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};

const JamDropdown = ({ name, value, onChange }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemLabel, setSelectedItemLabel] = useState("Jam");
  const [visibleItems, setVisibleItems] = useState(100);
  const dropdownRef = useRef(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleItemClick = (item) => {
    setSelectedItemLabel(item.jam);
    if (onChange) {
      onChange(item);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.jam && item.jam.toLowerCase().includes(searchTerm.toLowerCase()) // Fix here, use item.label instead of item.jam
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.e1.ikma.my.id/api/admin/jam/get/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (Array.isArray(response.data.data)) {
          setItems(response.data.data);
        } else {
          console.warn(
            "Invalid API response format. Using default empty array."
          );
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

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
      <Dropdown
        ref={dropdownRef}
        className="border-none flex justify-center items-center w-full"
      >
        <DropdownTrigger className="max-w-20 w-20 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md">
          <Button variant="faded">
            <p className="text-center text-xs">{selectedItemLabel}</p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu
            variant="faded"
            aria-label="Aksi Dinamis"
            className="max-h-40 overflow-y-auto"
          >
            {filteredItems.slice(0, visibleItems).map((item) => (
              <DropdownItem
                key={item.id}
                color={item.key === "x" ? "" : "default"}
                className="bg-input shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item)}
              >
                <div className="max-w-20 w-20 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out">
                  <span className="text-xs">{item.jam}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};

// Assuming items is an object
const HariDropdown = ({ name, value, onChange }) => {
  const items = {
    senin: { hari: "senin", label: "Senin" },
    selasa: { hari: "selasa", label: "Selasa" },
    rabu: { hari: "rabu", label: "Rabu" },
    kamis: { hari: "kamis", label: "Kamis" },
    jumat: { hari: "jumat", label: "Jumat" },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemLabel, setSelectedItemLabel] = useState("Hari");
  const [visibleItems, setVisibleItems] = useState(5);
  const dropdownRef = useRef(null);

  const handleItemClick = (key) => {
    const selectedItem = items[key];
    setSelectedItemLabel(selectedItem.label);
    if (onChange) {
      onChange(selectedItem.hari);
    }
  };

  const filteredItems = Object.values(items).filter((item) =>
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
        <DropdownTrigger className="max-w-52 w-full max-h-20 bg-sidebar border shadow-sm flex justify-center items-center gap-3 p-3 rounded-md">
          <Button variant="faded">
            <p className="text-center text-xs">{selectedItemLabel}</p>
            <MdOutlineArrowDropDown />
          </Button>
        </DropdownTrigger>
        <div className="flex items-center">
          <DropdownMenu
            variant="faded"
            aria-label="Dynamic Actions"
            ref={dropdownRef}
            className="max-h-40 overflow-y-auto"
          >
            {filteredItems.slice(0, visibleItems).map((item, index) => (
              <DropdownItem
                key={index}
                color={item.key === "x" ? "" : "default"}
                className="bg-input w-full text-xs shadow-sm items-center justify-center"
                onClick={() => handleItemClick(item.hari)} // Pass the key here
              >
                <div className="w-20 max-w-20 h-10 flex justify-center items-center border-b bg-input hover:bg-merah hover:border hover:text-white transition duration-300 ease-in-out">
                  <span className="mb-2">{item.label}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};

const TambahJadwal = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    kelas: null,
    jam_id: "",
    hari: "",
    mapel_a: "",
    mapel_b: "",
    mapel_c: "",
    mapel_d: "",
    mapel_e: "",
    mapel_f: "",
    mapel_g: "",
  });

  const handleFormChange = (field, item) => {
    let valueToSet;

    // If the field is one of the mapel fields, set only the "id"
    if (field.startsWith("mapel_")) {
      valueToSet = item.id;
    } else if (field === "jam_id") {
      // If the field is "jam_id", set only the "id"
      valueToSet = item?.id; // Use optional chaining to handle cases where item is undefined
    } else {
      // For other fields, use the entire item object
      valueToSet = item;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: valueToSet,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      console.log("Form Values to be Submitted:", formValues);

      const response = await axios.post(
        "https://api.e1.ikma.my.id/api/admin/jadwal/add",
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response);

      if (response.status === 200) {
        console.log("Data added successfully!");
        router.push("/jadwal"); // Adjust the redirect path accordingly
      }
    } catch (error) {
      console.error("Error adding data:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        // Handle specific error status codes
        if (error.response.status === 401) {
          toast.error("Unauthorized - Please log in", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response.status === 403) {
          toast.error("Forbidden - You do not have permission", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response.status === 404) {
          toast.error("Resource not found", { position: "top-right" });
        } else if (error.response.status === 422) {
          toast.error("Unprocessable Entity - Invalid data", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(`An error occurred: ${error.response.status}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error(`Error setting up the request: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleBack = () => {
    console.log("Navigating back...");
    router.push("/jadwal");
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Jadwal</title>
      </Head>
      <div className="max-w-screen-lg w-screen h-full flex flex-col justify-center items-center text-center">
        <h1 className="mb-5 text-2xl font-bold">TAMBAH JADWAL</h1>
        <form className="mt-10" onSubmit={handleSave}>
          <div className="mb-10 flex justify-start items-center">
            <div className="flex justify-start gap-5 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kelas
                </label>
                <KelasDropdown
                  name="kelas"
                  value={formValues.kelas}
                  onChange={(item) => handleFormChange("kelas", item)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam
                </label>
                <JamDropdown
                  name="jam_id"
                  value={formValues.jam_id}
                  onChange={(item) => handleFormChange("jam_id", item)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hari
                </label>
                <HariDropdown
                  name="hari"
                  value={formValues.hari}
                  onChange={(item) => handleFormChange("hari", item)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center mb-6">
            <div className=" items-center">
              <div className="grid grid-cols-4 gap-x-5 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran A
                  </label>
                  <MapelDropdown
                    name="mapel_a"
                    value={formValues.mapel_a}
                    onChange={(item) => handleFormChange("mapel_a", item)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran B
                  </label>
                  <MapelDropdown
                    name="mapel_b"
                    value={formValues.mapel_b}
                    onChange={(item) => handleFormChange("mapel_b", item)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran C
                  </label>
                  <MapelDropdown
                    name="mapel_c"
                    value={formValues.mapel_c}
                    onChange={(item) => handleFormChange("mapel_c", item)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran D
                  </label>
                  <MapelDropdown
                    name="mapel_d"
                    value={formValues.mapel_d}
                    onChange={(item) => handleFormChange("mapel_d", item)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center mb-6">
            <div className=" items-center">
              <div className="grid grid-cols-4 gap-x-5 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran E
                  </label>
                  <MapelDropdown
                    name="mapel_e"
                    value={formValues.mapel_e}
                    onChange={(item) => handleFormChange("mapel_e", item)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran F
                  </label>
                  <MapelDropdown
                    name="mapel_f"
                    value={formValues.mapel_f}
                    onChange={(item) => handleFormChange("mapel_f", item)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran G
                  </label>
                  <MapelDropdown
                    name="mapel_g"
                    value={formValues.mapel_g}
                    onChange={(item) => handleFormChange("mapel_g", item)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-14">
            <SaveButton onClick={handleSave} type="submit" />
            <Button
              className=" bg-white  text-black rounded-md w-36 h-12 shadow-md border hover:bg-gray-50 transition duration-200 mb-1"
              onClick={handleBack}
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer className="mt-12" />
    </Layout>
  );
};

export default TambahJadwal;