import React from "react";
import Router from "./shared/Router";

function App() {
    if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  return <Router />;
}

export default App;
