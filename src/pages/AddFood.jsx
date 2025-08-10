import { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const AddFood = () => {
  const [formData, setFormData] = useState({
    foodImage: "",
    foodTitle: "",
    category: "",
    quantity: 1,
    expiryDate: "",
    description: ""
  });

  const navigate=useNavigate();
  const auth=getAuth();
  const user=auth.currentUser;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      ...formData,
      addedDate: new Date().toISOString(),
      userEmail: user?.email || "unknown@example.com"
    };

    try {
      const res = await fetch("https://food-expiry-tracker-server-side.vercel.app/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foodData)
      });

      if (res.ok) {
        toast.success("Food item added successfully!");
        navigate("/my-items");
      } else {
        toast.error("Failed to add food item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl text-blue-500 font-bold mb-4">Add your Food in the Fridge!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="foodImage" placeholder="Food Image URL" onChange={handleChange} required className="input input-bordered w-full" />
        <input name="foodTitle" placeholder="Food Name" onChange={handleChange} required className="input input-bordered w-full" />
        <select name="category" onChange={handleChange} required className="select select-bordered w-full">
          <option value="">Select Category</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Fruit/Vegetables</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
        </select>
        <input name="quantity" placeholder="Quantity" type="number" min="1" onChange={handleChange} required className="input input-bordered w-full" />
        <small>Select Expiry Date: </small>
        <input name="expiryDate" type="date" onChange={handleChange} required className="input input-bordered w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="textarea textarea-bordered w-full"></textarea>
        <button type="submit" className="btn bg-blue-400 text-white cursor-pointer rounded-full w-full">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;