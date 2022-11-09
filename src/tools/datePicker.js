import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ko } from "date-fns/esm/locale";
const Calender = ({ filtered, setFiltered, register }) => {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      locale={ko}
      selected={date}
      onChange={(date) => {
        setDate(date);

        if (setFiltered) {
          setFiltered({ ...filtered, date: date });
        }
      }}
      minDate={new Date()}
      placeholderText="오늘 이후의 날짜를 선택하세요"
      dateFormat="yyyy/MM/dd"
      isClearable
    />
  );
};

export default Calender;
