import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router";

const NearExpire = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/nearly-expired")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
    <h3 className="flex mt-8 justify-center items-center font-bold text-yellow-600 text-center text-2xl">Nearly Expired Items <IoIosWarning /> </h3>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div key={item._id} className="card bg-base-100 md:w-96 shadow-sm">
          <figure>
            <img src={item.foodImage} alt={item.foodTitle} className="w-full h-40 object-cover rounded" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.foodTitle}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <div className="card-actions">
              <p><b>Quantity: </b>{item.quantity}</p>
              <p><b>Expiry: </b>{item.expiryDate}</p>
            </div>
            <button
            className="mt-3 px-4 py-2 md:w-1/2 bg-blue-400 text-white cursor-pointer rounded-full hover:bg-blue-400"
            onClick={() => navigate(`/food/${item._id}`)}
            >
            See Details
          </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default NearExpire;
