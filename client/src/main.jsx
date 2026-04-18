import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   
      <GoogleOAuthProvider clientId="12795157590-610td72e50pq3avr2i7b3940ijhokmdd.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>{" "}
   
  </StrictMode>,
);
