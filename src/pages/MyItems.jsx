import { useContext, useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import AuthContext from "../context/AuthContext"

const MyItems = () => {
  const {user}=useContext(AuthContext)
  const [items, setItems]=useState([]);
  const [editingItem, setEditingItem]=useState(null);

   useEffect(() =>{
          if(user?.email){
              fetch(`http://localhost:3000/api/foods?email=${user.email}`)
              .then(res => res.json())
              .then(data => setItems(data))
          }
      }, [user])

  const handleDelete = id =>{
    Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/foods/${id}`, {
          method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data =>{
            if (data.deletedCount > 0){
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                setItems(items.filter(t => t._id !== id));
            }
        })
    }
    })
  };

 const handleUpdate = async (e) =>{
  e.preventDefault();
  const form = e.target;

  const result = await Swal.fire({
    title: 'Confirm Update?',
    text: "Do you want to save the changes?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it',
  });

  if (!result.isConfirmed) return;

  const updatedData = {
    foodTitle: form.foodTitle.value,
    category: form.category.value,
    quantity: parseInt(form.quantity.value),
    expiryDate: form.expiryDate.value,
    description: form.description.value,
  };

  fetch(`http://localhost:3000/api/foods/${editingItem._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  }).then(res=>res.json())
    .then(data=>{
        if (data.modifiedCount > 0) {
            Swal.fire('Success!', 'Item updated successfully.', 'success');

            //Updating on frontend
            const updatedItems = items.map(item =>
            item._id === editingItem._id ? { ...item, ...updatedData } : item
            );
            setItems(updatedItems);

            //Auto-close modal
            setEditingItem(null);
        }
    })
};

  return (
    <div className="overflow-x-auto mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">My Food Items in the Fridge</h2>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>Image</th>
            <th>Food Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((food) => (
            <tr key={food._id}>
              <td><img src={food.foodImage} className="w-16 h-16 rounded" /></td>
              <td>{food.foodTitle}</td>
              <td>{food.category}</td>
              <td>{food.quantity}</td>
              <td className={moment(food.expiryDate).isBefore(moment()) ? "text-red-500 font-semibold" : ""}>
                {moment(food.expiryDate).format("YYYY-MM-DD")}
              </td>
              <td className="space-x-2">
                <button className="btn btn-sm bg-yellow-400" onClick={() => setEditingItem(food)}><FaPen /></button>
                <button className="btn btn-sm bg-red-400" onClick={() => handleDelete(food._id)}><IoTrashBin /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Food</h3>
            <input name="foodTitle" defaultValue={editingItem.title} required className="input input-bordered w-full mb-2" />
            <select name="category" defaultValue={editingItem.category} required className="select select-bordered w-full mb-2">
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Vegetables">Fruits/Vegetables</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </select>
            <input name="quantity" type="number" defaultValue={editingItem.quantity} min="1" required className="input input-bordered w-full mb-2" />
            <input name="expiryDate" type="date" defaultValue={moment(editingItem.expiryDate).format("YYYY-MM-DD")} required className="input input-bordered w-full mb-2" />
            <textarea name="description" defaultValue={editingItem.description} required className="textarea textarea-bordered w-full mb-2" />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setEditingItem(null)} className="btn btn-sm btn-outline">Cancel</button>
              <button type="submit" className="btn btn-sm btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyItems;
