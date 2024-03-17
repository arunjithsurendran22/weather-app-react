import React, { useState } from "react";
import DatePicker from "react-datepicker/dist/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setDate } from "../store/dateSlice";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch(setDate(date));
  };

  return (
    <div>
      <h2>Select Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default DateSelector;
