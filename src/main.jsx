import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Contex, { FirebaseContext } from "./Store/FirebaseContext.jsx";
import firebase from "./Firebase/config.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase }}>
      <Contex>
        <App />
      </Contex>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
