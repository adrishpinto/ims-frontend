import React, { useState } from "react";
import { FaLaptop, FaMouse, FaAsterisk, FaBars } from "react-icons/fa";
import { MdOutlinePhoneAndroid, MdWatch } from "react-icons/md";
import { PiHeadphonesFill } from "react-icons/pi";

const Sidebar = ({ getCategory, getProducts }) => {
  const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar visibility

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-[18%] bg-gray-900 min-h-[5vh] ${
        isOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="md:hidden flex justify-between items-center p-4">
        <FaBars size={30} className="text-white" onClick={toggleSidebar} />
      </div>

      <div className="mx-auto mt-12 w-96 rounded-[10px] ml-9">
        <h2 className="text-3xl border-b-2 w-36 border-slate-50 text-slate-100 mb-10 ml-6">
          Categories
        </h2>
        <ol className="text-2xl mt-3 text-slate-200 space-y-10 font-thin [&_li]:pl-5">
          <div
            onClick={() => getCategory("laptop")}
            className="flex items-center"
          >
            <FaLaptop size={25} />
            <li className="hover:cursor-pointer hover:text-slate-400">
              {" "}
              Laptop
            </li>
          </div>
          <div
            onClick={() => getCategory("watch")}
            className="flex items-center "
          >
            <MdWatch size={25} />
            <li className="hover:cursor-pointer hover:text-slate-400">
              {" "}
              Watch
            </li>
          </div>
          <div
            onClick={() => getCategory("phone")}
            className="flex items-center "
          >
            <MdOutlinePhoneAndroid size={25} />
            <li className="hover:cursor-pointer hover:text-slate-400">
              {" "}
              Phone
            </li>
          </div>
          <div
            onClick={() => getCategory("headphone")}
            className="flex items-center "
          >
            <PiHeadphonesFill size={25} />
            <li className="hover:cursor-pointer hover:text-slate-400">
              {" "}
              Headphones
            </li>
          </div>
          <div
            onClick={() => getCategory("mouse")}
            className="flex items-center "
          >
            <FaMouse size={25} />
            <li className="hover:cursor-pointer hover:text-slate-400">
              {" "}
              Mouse
            </li>
          </div>
          <div onClick={() => getProducts()} className="flex items-center ">
            <FaAsterisk size={20} />
            <li className="hover:cursor-pointer hover:text-slate-400">
              {" "}
              Show All
            </li>
          </div>
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
