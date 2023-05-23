import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { DriveProvider } from "./context/driveContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <DriveProvider>
      <App />
    </DriveProvider>
  </UserProvider>
);
