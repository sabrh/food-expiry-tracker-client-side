import { useEffect, useState } from "react";
import { GiIceCubes } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import { useNavigate } from "react-router";

const Fridge = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/fridge-foods")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const isExpired = (expiryDate) => {
    const today = new Date().toISOString().split("T")[0];
    return expiryDate < today;
  };

  return (
    <>
    <h3 className="flex justify-center items-center font-bold text-blue-500 text-center text-2xl"><GiIceCubes /> Fridge <RiFridgeFill /> </h3>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <div key={item._id} className="card bg-base-100 md:w-70 shadow-sm">
          <figure>
            <img src={item.foodImage} alt={item.foodTitle} className="w-full h-40 object-cover rounded" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.foodTitle}
              {isExpired(item.expiryDate) && (
              <div className="badge badge-error">Expired</div>
            )}
            </h2>
            <div className="card-actions">
              <div className="badge badge-info">{item.category}</div>
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

export default Fridge;