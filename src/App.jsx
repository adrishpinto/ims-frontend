import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/sign_up/Login";
import Register from "./components/sign_up/Register";
import Home from "./components/home_page/Home";
import FuncHome from "./components/home_page/FuncHome";
import Track from "./components/home_page/Track";
import Welcome from "./components/user/Welcome";
import Checkout from "./components/user/Checkout";
import Categorys from "./components/category/CategoryTable";
import AddCategory from "./components/category/AddCategory";
import ProductTable from "./components/product/ProductTable";
import AddProduct from "./components/product/AddProduct";
import EditProduct from "./components/product/EditProduct";
import OrderTable from "./components/orders/OrderTable";
import UserList from "./components/userList/UserList";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id/home/track" element={<Track />} />
          <Route path="/user/:id/home" element={<FuncHome />} />
          <Route path="/user/:id" element={<Welcome />} />
          <Route path="/user/:id/home/orders" element={<Checkout />} />
          <Route path="/categories" element={<Categorys />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
