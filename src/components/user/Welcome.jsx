import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Welcome() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getUser(id);
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getUser = async (id) => {
    const res = await axios.get(`${apiUrl}/login/${id}`);
    setUser(res.data[0].firstname);
  };

  const oc = () => {
    navigate("home");
  };
  return (
    <div>
      <div className="w-full h-screen flex flex-col space-y-4 bg-gradient-to-r from-cyan-500 to-emerald-500 ani2">
        <h1 className="text-center text-5xl pt-[17%] ani1 flex relative  w-fit invisible translate-x-[-50%]">
          Welcome {user}
        </h1>
        <h1
          onClick={oc}
          className="text-center text-4xl font-light border-black border-y hover:bg-gray-100 hover:cursor-default h-12 hover:bg-opacity-15 w-96 mx-auto ani3 "
        >
          Start Placing Orders
        </h1>
      </div>
    </div>
  );
}

export default Welcome;
