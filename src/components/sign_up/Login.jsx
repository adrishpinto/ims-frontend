import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([]);
  const [firstname, setfName] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing popup visibility
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/login`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const Admin = (name, pass, users) => {
    let check = false;

    users.forEach((item) => {
      if (name === item.firstname && pass === item.password) {
        check = true;
      }
    });

    if (name === "admin" && pass === "1234") {
      navigate("/products");
    } else if (check) {
      navigate(`/user/${name}`);
    } else {
      alert("Incorrect name or password!");
    }
  };

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="bg-gradient-to-l from-blue-500 to-purple-500 h-screen min-h-full">
      <div className="h-full ">
        <div className="div flex flex-col justify-center items-center h-full ">
          <div className="bg-white sm:w-[35%] w-4/5 rounded-xl border border-slate-500 shadow-2xl py-10 pb-14 mt-20">
            <h1 className="text-3xl text-gray-600 text-center">Sign In With</h1>
            <div className="mt-10 w-2/3 mx-auto ">
              <div className="text-gray-700 font-semibold text-sm">
                Username
              </div>
              <div className="border-b-2 border-transparent bg-gradient-to-r  to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
                <input
                  type="text"
                  className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4  "
                  placeholder="Username"
                  value={firstname}
                  onChange={(e) => setfName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 w-2/3 mx-auto">
              <div className="text-gray-700 font-semibold text-sm mb-">
                Password{" "}
              </div>
              <div className="border-b-2 border-transparent bg-gradient-to-r  to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
                <input
                  type="text"
                  className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4  "
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link to={"/register"}>
                <span className="text-[12px] text-gray-400 pl-2 underline my-3 block hover:cursor-pointer">
                  New User? Click here to create a new account
                </span>
              </Link>
              <div
                className="bg-gradient-to-l from-blue-500 to-purple-500 text-slate-50 text-center py-2 rounded-md text-md hover:cursor-pointer hover:bg-gray-800"
                onClick={() => Admin(firstname, password, users)}
              >
                Sign in
              </div>
            </div>
          </div>

          <div
            className="hover:cursor-pointer mt-10 px-3 py-2 bg-black font-thin rounded-lg text-xl text-white"
            onClick={togglePopup}
          >
            View Login Details
          </div>

          {/* Popup Modal */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-2/3">
                <h2 className="text-xl font-bold mb-4">Login Details</h2>
                <p>
                  Login details for <b>User</b>:
                </p>
                <ul className="list-disc pl-5">
                  <li>Username: user</li>
                  <li>Password: user</li>
                </ul>

                <div className="mt-5">
                  <p>
                    Login details for <b>Admin</b>:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Username: Admin</li>
                    <li>Password: 1234</li>
                  </ul>
                </div>

                <div className="mt-5">
                  <p>
                    You can also login by after creating a new account. if you
                    login as Admin please reframe from deleting and modifying
                    alot of items. Make small changes such as the name and price
                    to see it change in the shopping site.
                  </p>
                </div>
                <div className="mt-5">
                  <p>
                    <b>Note :</b> if Login does not work wait for 30-40 seconds
                    and try again as backend is hosted on free platform.
                  </p>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={togglePopup} // Close the popup
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
