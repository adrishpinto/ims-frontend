import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register1() {
  const [users, setUsers] = useState([]);
  const [firstname, setfName] = useState("");
  const [lastname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/login`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/register`, {
        firstname,
        lastname,
        email,
        password,
        mobile,
        address,
      });
      alert("You Have Successfully Created an Account. Please Login.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-l from-blue-500 to-purple-500  min-h-screen flex flex-col ">
        <div>
          <h1 className="text-4xl font-light text-center mt-5">Register</h1>
        </div>
        <form
          onSubmit={saveUser}
          className="bg-white sm:w-2/5 w-4/5 mx-auto mt-5 mb-10 rounded-xl border border-slate-500 shadow-2xl py-10 pb-14"
        >
          <h1 className="text-3xl text-gray-600 text-center">
            Create an Account
          </h1>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <div className="mt-10 w-2/3 mx-auto">
            <div className="text-gray-700 font-semibold text-sm">
              First Name
            </div>
            <div className="border-b-2 border-transparent bg-gradient-to-r to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
              <input
                type="text"
                className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setfName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-10 w-2/3 mx-auto">
            <div className="text-gray-700 font-semibold text-sm">Last Name</div>
            <div className="border-b-2 border-transparent bg-gradient-to-r to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
              <input
                type="text"
                className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setlName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-10 w-2/3 mx-auto">
            <div className="text-gray-700 font-semibold text-sm">Email</div>
            <div className="border-b-2 border-transparent bg-gradient-to-r to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
              <input
                type="email"
                className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-10 w-2/3 mx-auto">
            <div className="text-gray-700 font-semibold text-sm">Password</div>
            <div className="border-b-2 border-transparent bg-gradient-to-r to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
              <input
                type="password"
                className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-10 w-2/3 mx-auto">
            <div className="text-gray-700 font-semibold text-sm">
              Mobile Number
            </div>
            <div className="border-b-2 border-transparent bg-gradient-to-r to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
              <input
                type="tel"
                className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-10 w-2/3 mx-auto">
            <div className="text-gray-700 font-semibold text-sm">Address</div>
            <div className="border-b-2 border-transparent bg-gradient-to-r to-gray-500 from-gray-500 focus-within:from-purple-400 focus-within:to-blue-500">
              <input
                type="text"
                className="shadow-2xl h-10 w-full bg-white focus:outline-none pl-4"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <Link to={"/login"}>
              {" "}
              <span className="text-[12px] text-gray-400 pl-2 underline my-3 block hover:cursor-pointer">
                Already have an account? Click here
              </span>
            </Link>
          </div>
          <div className="mt-2 w-2/3 mx-auto">
            <div
              className="bg-gradient-to-l from-blue-500 to-purple-500 text-slate-50 text-center py-2 rounded-md text-md hover:cursor-pointer"
              onClick={saveUser}
            >
              Register
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register1;
