import React, { useState } from "react";
import DatePicker from "react-datepicker/dist/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setDate } from "../store/dateSlice";
import { FaFilter } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch(setDate(date));
  };

  const handleResetDate = () => {
    setSelectedDate(null);
    dispatch(setDate(null)); // Reset date in Redux store
  };

  return (
    <div className="flex mb-10  ">
      <FaFilter className={`text-${selectedDate ? "red" : "green"}-600 mr-2 text-2xl`} />
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          showPopperArrow={false} // Hide the calendar after date selection
          className="py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-red-300 transition-shadow duration-300 ease-in-out"
        />
        {selectedDate && (
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-${selectedDate ? "red" : "green"}-300 text-gray-800 rounded-md px-3 py-1 transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 shadow-md flex items-center`}
            onClick={handleResetDate}
          >
            <RiArrowGoBackFill className="mr-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
