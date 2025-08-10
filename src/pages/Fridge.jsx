import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { GiIceCubes } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import { useNavigate } from "react-router";

const Fridge = () => {
  const [items, setItems] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [expiredCount, setExpiredCount] = useState(0)
  const [nearlyExpiredCount, setNearlyExpiredCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://food-expiry-tracker-server-side.vercel.app/fridge-foods")
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setFiltered(data)
        countExpiry(data)
      })
  }, [])

  const isExpired = (expiryDate) => {
    const today = new Date().toISOString().split("T")[0]
    return expiryDate < today
  };

  const isNearlyExpired = (expiryDate) => {
    const today = new Date()
    const target = new Date(expiryDate)
    const diff = (target - today) / (1000 * 60 * 60 * 24); // days left
    return diff >= 0 && diff <= 5
  };

  //Count Expired and Nearly Expired
  const countExpiry = (data) => {
    const expired = data.filter(item => isExpired(item.expiryDate)).length
    const nearlyExpired = data.filter(item => isNearlyExpired(item.expiryDate)).length
    setExpiredCount(expired)
    setNearlyExpiredCount(nearlyExpired)
  };

  //Search 
  useEffect(() => {
    let result = items

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(item =>
        item.foodTitle.toLowerCase().includes(s) ||
        item.category.toLowerCase().includes(s)
      );
    }

    if (category !== 'All') {
      result = result.filter(item => item.category === category);
    }

    setFiltered(result);
  }, [search, category, items]);

  const categories = ['All', 'Dairy', 'Meat', 'Vegetables', 'Snacks'];

  return (
    <>
    
    {/* React Countup */}
      <div className="flex justify-center gap-8 my-4 text-lg font-semibold text-center">
        <div className="bg-red-100 p-4 rounded">
          Expired: <CountUp end={expiredCount} duration={10} />
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          Nearly Expiring: <CountUp end={nearlyExpiredCount} duration={10} />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 px-4">
        <input type="text" placeholder="Search by name or category..." className="input input-bordered w-full md:w-80"
          value={search} onChange={(e) => setSearch(e.target.value)}/>

        <select className="select select-bordered w-full md:w-60" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {filtered.length > 0 ? (
        filtered.map((item) => (
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
              <p className="text-blue-600"><b>{item.category}</b></p> 
              <p><b>Quantity: </b>{item.quantity}</p>
              <p><b>Expiry: </b>{item.expiryDate}</p>
            </div>
            
            <button className="mt-3 px-4 py-2 md:w-1/2 btn btn-outline btn-info cursor-pointer rounded-full"
            onClick={() => navigate(`/food/${item._id}`)}> See Details </button>
          </div>
        </div>
      ))

      ) : (
        <p className="text-center col-span-full text-gray-500">No items found.</p>
      )}
    </div>
    </>
  );
};

export default Fridge;