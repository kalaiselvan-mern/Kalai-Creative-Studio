import React from "react";
import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";
import Product from "../pages/Product";
import Sidebar from "../layout/SideBar";
import UploadForm from "../pages/UploadFiles";
import Error from "../pages/Error";
import JoinStudio from "../pages/JoinStudio";

const Layout = () => {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-black">
        <Outlet />
      </main>
    </div>
  );
};

// 2. THE MAIN APP COMPONENT
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Product />} />
          <Route path="/user/joinstudio" element={<JoinStudio />} />
        </Route>

          <Route path="/admin/upload-files" element={<UploadForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
