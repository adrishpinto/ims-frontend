import React, { useEffect, useState } from "react";
import banner from "../../assets/banner1.jpeg";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdWatch } from "react-icons/md";
import { PiHeadphonesFill } from "react-icons/pi";
import Sidebar from "./Sidebar";
import {
  FaStar,
  FaAsterisk,
  FaLaptop,
  FaMouse,
  FaShoppingCart,
} from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useParams } from "react-router-dom";

function Home(props) {
  const { id } = useParams();
  const [order_id, setOrderID] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`${apiUrl}/login/${id}`);
    setOrderID(`${res.data[0].password}`);
  };
  const [productname, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [x, setX] = useState(0);
  const getProducts = async () => {
    const res = await axios.get(`${apiUrl}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    postOrder();
  }, [x]);

  const oc = () => {
    alert(order_id);
  };

  const getCategory = async (id) => {
    const res = await axios.get(`${apiUrl}/category/${id}`);
    setProducts(res.data);
  };

  const getOneProduct = async (id) => {
    // function is for add to cart
    const response = await axios.get(`${apiUrl}/products/${id}`);
    setName(response.data.productname);
    setDescription(response.data.description);
    setPrice(response.data.price);
    setCategory(response.data.category);
    setColor(response.data.color);
    setImage(response.data.image);
    setX((i) => i + 1);
  };

  const postOrder = async () => {
    try {
      await axios.post(`${apiUrl}/orders`, {
        productname,
        description,
        price,
        category,
        color,
        image,
        quantity,
        order_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" w-full h-full">
        <div className="relative h-[45vh]">
          <h1 className="invisible sm:visible text-7xl absolute top-[-10%] font-semibold left-[50%] mt-40  border-white translate-x-[-50%] text-white">
            Electronic <span className="hollow">Mart</span>
          </h1>
          <img
            src={banner}
            alt=""
            className="w-full h-[45vh] border-b-4 border-black"
          />
          <Link to="/">
            <div className="text-white dark:hover:opacity-70 border border-black px-3 py-1 w-36 bg-gray-900 bg-opacity-30 absolute right-16 text-xl hover:cursor-pointer hover:bg-opacity-50 flex items-center top-10">
              <i className="dark:text-white">
                <IoIosLogOut size={40} />
              </i>
              <span>Logout</span>
            </div>
          </Link>
          <Link to="orders">
            <div className="text-white dark:hover:opacity-70 border border-black px-3 py-1 w-36 bg-gray-900 bg-opacity-30 absolute right-16 text-xl hover:cursor-pointer hover:bg-opacity-50 flex items-center top-32">
              <i className="dark:text-white">
                <IoCartOutline size={40} />
              </i>
              <span>Cart</span>
            </div>
          </Link>
          <Link to="track">
            <div className="text-white dark:hover:opacity-70 border border-black px-3 py-2 w-36 bg-gray-900 bg-opacity-30 absolute right-16 text-xl hover:cursor-pointer hover:bg-opacity-50 flex items-center top-56">
              <i className="dark:text-white">
                <CiBoxList size={30} />
              </i>
              <span>Orders</span>
            </div>
          </Link>
        </div>

        <div className="flex  w-full h-full">
          {/* side bar */}

          <Sidebar />
          {/* side bar end */}

          {/* product map start*/}

          <div className=" sm:w-[83%] w-[90%] mx-auto pt-5 flex items-center  justify-center flex-wrap  ">
            {products.map((item) => {
              return (
                <div className="h-fit py-3 border border-slate-400 w-80 bg-slate-200 relative m-5 mx-7 ">
                  <img
                    src={`${item.image}`}
                    className="bg-slate-200 h-[250px] pt-0 mx-auto mb-1"
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
                        onClick={() => getOneProduct(item._id)}
                        className="mt-3 border font-extralight hover:bg-opacity-90 border-black px-2 bg-teal-900 text-white text-xl"
                      >
                        Add To Cart
                      </button>
                      <div className="flex items-center">
                        <input
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                          type="text"
                          value={quantity}
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
