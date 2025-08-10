import { useEffect, useState } from "react";

const Expired = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://food-expiry-tracker-server-side.vercel.app/expired-foods")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
    <h3 className="flex mt-8 justify-center items-center font-bold text-red-600 text-center text-2xl">Expired Items</h3>
    
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {items.map((item) => (
            <div key={item._id} className="card bg-red-100 md:w-70 shadow-sm">
              <figure>
                <img src={item.foodImage} alt={item.foodTitle} className="w-full h-40 object-cover rounded" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.foodTitle}
                  <div className="badge badge-error">Expired</div>
                </h2>
                <div className="card-actions">
                  <p className="text-blue-600"><b>{item.category}</b></p>
                  <p><b>Quantity: </b>{item.quantity}</p><br/>
                  <p><b>Expiry: </b>{item.expiryDate}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default Expired;