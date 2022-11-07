import { createContext } from "react";
import { useState } from "react";

export const MainContext = createContext({
  onDateSetting: (a) => {},
  dateSet: { start: "" },
});

const Store = (props) => {
  const [dateSet, setDateSet] = useState({ start: "" });
  const onDateSetting = (start) => {
    if (start) {
      const startDay =
        start.getFullYear().toString() +
        `.` +
        (start.getMonth() + 1).toString() +
        `.` +
        start.getDate().toString();
      return setDateSet({ start: startDay });
    }
  };
};

export default Store;
