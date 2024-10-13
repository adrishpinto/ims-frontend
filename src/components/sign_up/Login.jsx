import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [users, setUsers] = useState([]);
  const [firstname, setfName] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="bg-gradient-to-l from-blue-500 to-purple-500 h-screen">
      <div>
        <div className="opacity-0">----</div>
        <h1 className="text-4xl font-light text-center mt-10">Login Page</h1>
      </div>
      <div className="bg-white sm:w-2/5 w-4/5 mx-auto mt-10 rounded-xl border border-slate-500 shadow-2xl py-10 pb-14">
        <h1 className="text-3xl text-gray-600 text-center">Sign In With</h1>
        <div className="mt-10 w-2/3 mx-auto ">
          <div className="text-gray-700 font-semibold text-sm">Username</div>
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
            {" "}
            <span className="text-[12px] text-gray-400 pl-2 underline my-3 block hover:cursor-pointer">
              New User? Click here to create a new account
            </span>
          </Link>
          <div
            className="bg-gradient-to-l from-blue-500 to-purple-500 text-slate-50   text-center py-2 rounded-md text-md hover:cursor-pointer hover:bg-gray-800 "
            onClick={() => Admin(firstname, password, users)}
          >
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
