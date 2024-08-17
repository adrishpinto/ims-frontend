import React, { useEffect, useState } from "react";
import banner from "../../assets/banner1.jpeg";
import { FaLaptop } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdWatch } from "react-icons/md";
import { PiHeadphonesFill } from "react-icons/pi";
import { FaMouse } from "react-icons/fa";
import phone from "../../assets/phone.avif";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";

function Home() {
  const [products, setProducts] = useState([]);
  const [ext, setExt] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  const getCategory = async (id) => {
    const res = await axios.get(`http://localhost:5000/category/${id}`);
    setProducts(res.data);
  };
  const x = "watch";

  return (
    <div>
      <div className=" w-full h-full ">
        <div className="relative h-[45vh] ">
          <h1 className="text-6xl absolute top-[-10%] font-semibold left-[50%] mt-40 border-b-4 border-white translate-x-[-50%] text-white">
            Best Place For Shopping!
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
        <div className="flex  w-full h-full">
          {/* side bar */}
          <div className="w-[17%] bg-gray-900 min-h-full">
            <div className=" mx-auto mt-12 w-96 rounded-[10px] ml-9">
              <h2 className="text-3xl border-b-2 w-36 border-slate-50 text-slate-100 mb-10 ml-6">
                Categories
              </h2>
              <ol className="text-2 xl mt-3 text-slate-200 space-y-10 font-thin [&_li]:pl-5">
                <div
                  onClick={() => getCategory("laptop")}
                  className="flex items-baseline "
                >
                  <FaLaptop size={25} />
                  <li className="hover:cursor-pointer hover:text-slate-400">
                    {" "}
                    Laptop
                  </li>
                </div>
                <div
                  onClick={() => getCategory("watch")}
                  className="flex items-baseline "
                >
                  <MdWatch size={25} />
                  <li className="hover:cursor-pointer hover:text-slate-400">
                    {" "}
                    Watch
                  </li>
                </div>
                <div
                  onClick={() => getCategory("phone")}
                  className="flex items-baseline "
                >
                  <MdOutlinePhoneAndroid size={25} />
                  <li className="hover:cursor-pointer hover:text-slate-400">
                    {" "}
                    Phone
                  </li>
                </div>
                <div
                  onClick={() => getCategory("headphone")}
                  className="flex items-baseline "
                >
                  <PiHeadphonesFill size={25} />
                  <li className="hover:cursor-pointer hover:text-slate-400">
                    {" "}
                    Headphones
                  </li>
                </div>
                <div
                  onClick={() => getCategory("mouse")}
                  className="flex items-baseline "
                >
                  <FaMouse size={25} />
                  <li className="hover:cursor-pointer hover:text-slate-400">
                    {" "}
                    Mouse
                  </li>
                </div>
                <div
                  onClick={() => getProducts()}
                  className="flex items-baseline "
                >
                  <FaAsterisk size={20} />
                  <li className="hover:cursor-pointer hover:text-slate-400">
                    Show All
                  </li>
                </div>
              </ol>
            </div>
          </div>
          {/* side bar */}

          <div className=" w-[82%] pt-5 flex  flex-wrap ml-20">
            {products.map((item) => {
              return (
                <div className="h-[450px] border border-slate-400 w-80 bg-slate-200 relative m-5 mx-7">
                  <img
                    src={`${item.image}`}
                    className="bg-slate-200 h-[250px] pt-2 mx-auto mb-10"
                  ></img>
                  <div className="py-2 px-3">
                    <div className="flex items-baseline">
                      <p className="text-2xl font-light mr-3">
                        {item.productname}
                      </p>

                      <div className="absolute right-2">
                        <div className="flex items-baseline">
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
                        onClick={() => alert("please login to add items")}
                        className="mt-3 border font-extralight hover:bg-opacity-90 border-black px-2 bg-teal-900 text-white text-xl"
                      >
                        Add To Cart
                      </button>
                      <div className="flex items-baseline">
                        <input
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
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
