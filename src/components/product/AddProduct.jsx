import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [productname, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [product_Id, setProduct_id] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;

  const getOneProduct = async (id) => {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    setName(response.data.productname);
    setPrice(response.data.category);
    setCategory(response.data.price);
    setColor(response.data.color);
    setImage(response.data.image);
    setRating(response.data.rating);
    setDescription(response.data.description);
    setProduct_id(response.data.product_Id);
    setQuantity(response.data.quantity);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/products`, {
        productname,
        price,
        category,
        color,
        image,
        rating,
        description,
        product_Id,
        quantity,
      });
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const oc = () => {
    navigate("/products");
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 2xl:h-screen pt-32 xl:h-full">
        <div className="mx-auto w-1/2 rounded-2xl  border border-black bg-gray-50 bg-opacity-50 pb-48 pl-32">
          <h1 className="text-5xl font-semibold pt-10 text-center pr-[128px]">
            Add Product
          </h1>
          <div className="text-2xl font-semibold font-mono 2xl:flex 2xl:flex-wrap 2xl:[&>div]:mx-10 [&>div]:mt-4 mt-14 xl:pr-20 [&_input]:text-2xl [&_input]:w-96 [&_input]:h-10 ">
            <div className="">
              <div className="">Product Name:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={productname}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="">
              <div className="">Price:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder=""
              />
            </div>

            <div>
              <div className="">Category:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <div className="">Color:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <div className="">image-url:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <div className="">Rating:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <div className="">Description:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <div className="">Product_id:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={product_Id}
                onChange={(e) => setProduct_id(e.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <div className="">Quantity:</div>
              <input
                type="text"
                className="input focus:outline-none rounded-md hover:bg-slate-100 pl-5 focus:ring-2 focus:ring-blue-400 border-slate-50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder=""
              />
            </div>
            <div></div>
            <div>
              <form onSubmit={addProduct}>
                <button className="border-4 border-lime-600 font-semibold w-96 px-8 mt-9 text-2xl rounded-lg bg-lime-300 p-1 ">
                  Save Product
                </button>
              </form>
            </div>
            <div>
              <button
                onClick={oc}
                className="border-4 border-amber-600 font-semibold w-96 px-8 mt-9 text-2xl rounded-lg bg-amber-200 py-1 "
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
