import React, { useEffect } from "react";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import phone from "../../assets/phone.jpeg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Checkout() {
  const [productname, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState();
  const [order_id, setOrderID] = useState("");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getOrders();
  }, [order_id]);

  useEffect(() => {
    initTotal();
  }, [orders]);

  const getUser = async () => {
    const res = await axios.get(`http://localhost:5000/login/${id}`);
    setOrderID(`${res.data[0].password}`);
  };

  const init = () => {
    orders.map((items) =>
      postOrder(
        items.productname,
        items.description,
        items.price,
        items.category,
        items.color,
        items.image,
        items.quantity,
        items.order_id
      )
    );
    orders.map((items) => {
      deleteItem(items._id);
    });
    setTotal(0);
  };
  const initTotal = () => {
    let count = 0;
    orders.map((items) => {
      count = count + items.price;
      setTotal(count);
    });
  };

  const postOrder = async (
    productname,
    description,
    price,
    category,
    color,
    image,
    quantity,
    order_id
  ) => {
    try {
      await axios.post(`http://localhost:5000/ordersPost`, {
        productname,
        price,
        description,
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

  const getSum = () => {
    let count = 0;
    {
      if (orders.length >= 0) {
        orders.map((item) => {
          count = count + item.price * item.quantity;
          setTotal(count);
        });
      } else {
        setTotal(9);
      }
    }
  };

  const getOrders = async () => {
    const res = await axios.get(`http://localhost:5000/orders/${order_id}`);
    setOrders(res.data);
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100">
      <div className="h-96 bg-black">
        <h1 className="text-9xl text-white font-thin text-center pt-[5%] ">
          Checkout.
        </h1>
        <Link to="/">
          <div className="text-white dark:hover:opacity-70 px-3 py-1 w-40 bg-black  bg-opacity-30 absolute right-[90px] text-xl hover:cursor-pointer hover:text-blue-500 flex items-center top-10">
            <i className="dark:text-white">
              <IoIosLogOut size={30} />
            </i>
            <span>Logout</span>
          </div>
        </Link>

        <div
          onClick={() => navigate(-1)}
          className="text-white dark:hover:opacity-70 border border-black px-3 py-1 w-40 bg-black bg-opacity-30 absolute right-[90px] text-xl hover:cursor-pointer hover:hover:text-blue-500 flex items-center top-32"
        >
          <i className="dark:text-white">
            <SlHome size={25} />
          </i>
          <span className="ml-2">Home</span>
        </div>
      </div>
      {orders.map((items) => {
        return (
          <div>
            <div className="w-[90%] border border-black h-80 mt-5 mx-auto flex bg-slate-200 ">
              <div className="h-80 w-96">
                <img
                  src={`${items.image}`}
                  className="h-full object-fill border-2 border-black "
                ></img>
              </div>
              <div className="px-20 py-10 space-y-5 w-full">
                <div className="flex w-ful justify-between">
                  <h1 className="text-2xl font-semibold border-b-2 border-black">
                    {items.productname}
                  </h1>
                  <button
                    onClick={() => deleteItem(items._id)}
                    className="border text-white text-xl px-2 bg-red-500 rounded-lg shadow-lg"
                  >
                    Remove
                  </button>
                </div>
                <h1 className="text-xl font-light ">{`${items.color}" "${items.description}`}</h1>
                <h1 className="text-xl font-bold">{items.price} </h1>
                <div className="flex items-baseline">
                  <div className="text-xl w-10 border-y border-black focus:outline-none text-center placeholder:text-gray-900">
                    {items.quantity}
                  </div>
                  <p className="text-l font-thin">
                    unit{`${items.quantity > 1 ? "s" : ""}`}
                  </p>
                  <button className="border text-white text-xl px-2 bg-green-500 ml-10 rounded-lg shadow-lg">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="bg-gray-900 w-full flex items-center justify-center space-x-28 h-40 mt-10">
        <div className="flex items-baseline space-x-5">
          <h1 className="text-2xl text-white font-thin "> Total:</h1>
          <h1
            onClick={() => getSum()}
            className="py-2 px-3 text-2xl font-light w-32 text-center h-12 rounded-xl bg-green-600 text-white hover:cursor-pointer hover:bg-green-700"
          >
            {total == -1 ? "Calculate" : total}
          </h1>
        </div>

        <button
          onClick={() => init()}
          className="py-1 px-3 text-2xl font-light h-12 rounded-xl bg-green-600 text-white hover:cursor-pointer w-32 hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Checkout;
