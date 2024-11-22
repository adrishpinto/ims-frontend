import React, { useEffect, useState } from "react";
import banner from "../../assets/banner1.jpeg";

import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

import { IoIosLogIn } from "react-icons/io";
import Sidebar from "./Sidebar";

function Home() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(`${apiUrl}/products`);
    setProducts(res.data);
  };

  const getCategory = async (id) => {
    const res = await axios.get(`${apiUrl}/category/${id}`);
    setProducts(res.data);
  };
  const x = "watch";

  return (
    <div>
      <div className=" w-full h-full ">
        <div className="relative h-[45vh] ">
          <h1 className="invisible sm:visible text-7xl absolute top-[-10%] font-semibold left-[50%] mt-40  border-white translate-x-[-50%] text-white">
            Electronic <span className="hollow">Mart</span>
          </h1>
          <img
            src={banner}
            alt=""
            className="w-full h-[45vh] border-b-4 border-black"
          />
          <Link to="/login">
            <div className="text-white dark:hover:opacity-70 border border-black px-3 py-1 bg-gray-900 bg-opacity-30 absolute right-16 text-2xl hover:cursor-pointer hover:bg-opacity-50 flex items-center top-10">
              <i className="dark:text-white">
                <IoIosLogIn size={25} />
              </i>
              <span>Login</span>
            </div>
          </Link>
        </div>
        <div className="flex w-full">
          <Sidebar getProducts={getProducts} getCategory={getCategory} />
          {/* side bar */}

          <div className=" sm:w-[83%] w-[90%] mx-auto pt-5 flex items-center  justify-center flex-wrap  ">
            {products.length == 0 && (
              <div className="text-5xl text-center self-start w-full font-thin">
                Server is hosted using free services. Please wait 30-60 seconds
                for the data to load. 
              </div>
            )}
            {products.map((item) => {
              return (
                <div className="h-fit border border-slate-400 w-80 bg-slate-200 relative m-5 py-3 mx-7 ">
                  <img
                    src={`${item.image}`}
                    className="bg-slate-200 h-[250px]  pt-0 mx-auto mb-1"
                  ></img>
                  <div className="py-2 px-3">
                    <div className="flex items-center">
                      <p className="text-2xl font-light mr-3">
                        {item.productname}
                      </p>

                      <div className="absolute right-2">
                        <div className="flex items-center">
                          <FaStar color="orange" size={20} />
                          <p className="text-2xl ">{item.rating}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl">
                      Price: <span className="font-semibold">{item.price}</span>
                    </p>
                    <p className="text-xl"></p>
                    <div className="flex justify-between items-baseline">
                      <button
                        onClick={() => alert("login to add item to card")}
                        className="mt-3 border font-extralight hover:bg-opacity-90 border-black px-2 bg-teal-900 text-white text-xl"
                      >
                        Add To Cart
                      </button>
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="text-2xl font-light w-10 border-y border-black focus:outline-none text-center placeholder:text-gray-900"
                          placeholder="1"
                        />
                        <p className="text-2xl font-thin mr-10">units</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
