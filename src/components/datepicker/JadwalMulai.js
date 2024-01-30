  import React, { useState } from 'react';
  import Datetime from 'react-datetime';
  import "react-datetime/css/react-datetime.css";
  import { FaCalendarAlt } from "react-icons/fa";

  const CustomDatePickerInput = (props, openCalendar, closeCalendar) => {
    const handleIconClick = () => {
      openCalendar();
    };

    return (
      <div className="block">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FaCalendarAlt className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={handleIconClick} />
        </div>
        <input {...props} />
      </div>
    );
  };

  const JadwalMulai = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleToggleDatePicker = () => {
      setShowDatePicker(!showDatePicker);
    };

    const handleDatePickerChange = (selectedDate) => {
      console.log("Selected Date:", selectedDate);
    };

    return (
      <Datetime
        inputProps={{
          className: "bg-sidebar text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5 shadow-inner ",
          placeholder: "Jadwal Mulai",
        }}
        renderInput={CustomDatePickerInput}
        onChange={handleDatePickerChange}
      />
    );
  }

  export default JadwalMulai;
