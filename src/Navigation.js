import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductJumpsuit from "./pages/ProductJumpsuit";
import AddPage from "./pages/AddPage";
import AdminProvider from "./contexts/AdminProvider";
import AdminPage from "./pages/AdminPage";
import EditPage from "./pages/EditPage";

function Navigation() {
  return (
    // <ClientProvider>
    <AdminProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductJumpsuit />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="admin/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
    // </ClientProvider>
  );
}

export default Navigation;
