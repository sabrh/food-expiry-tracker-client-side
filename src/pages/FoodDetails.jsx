import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AuthContext from '../context/AuthContext'

const FoodDetails = () => {
    const {id} = useParams();
    const { user } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() =>{
    axios.get(`http://localhost:3000/api/foods/${id}`).then((res) => {
      setFood(res.data);
      setNotes(res.data.notes || []);
    });
  },[id]);

    const getTimeRemaining =(expiryDate) =>{
    const now = moment();
    const expiry = moment(expiryDate);
    const duration = moment.duration(expiry.diff(now));
    if (duration.asMilliseconds() < 0) return "Expired";
    return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m remaining`;
  };

  const handleAddNote= async () =>{
    const note = {
      text: noteText,
      date: new Date().toISOString(),
      userEmail: user.email,
    };

    try {
    const res = await axios.post(`http://localhost:3000/api/foods/${id}/notes`, note);

    if (res.data.success) {
      setNotes((prevNotes) => [...prevNotes, { text: noteText, date: note.date }]);
      setNoteText('');
    } else{
      console.error("Failed to add note:",res.data);
    }
  } catch (error){
    console.error("Error adding note:",error);
  }
  };

  if (!food){
        return <div className="text-center text-gray-500 mt-10">Loading food details...</div>;
    }

  const isOwner = user?.email === food.userEmail;

return (
    <>
    <img src={food.foodImage} alt={food.title} className="rounded-2xl w-2xl mx-auto h-64 object-cover" />
    <div className="flex flex-row w-2xl mx-auto justify-between"> 
      <div>
        <p className="text-xl font-bold">{food.foodTitle}</p>
        <p className="text-gray-700">{food.description}</p>
        <p>Category: {food.category}</p>
        <p>Quantity: {food.quantity}</p>
        <p>Expiry Date: {moment(food.expiryDate).format("YYYY-MM-DD")}</p>
        <p className="font-medium text-red-500 mt-2">
            {getTimeRemaining(food.expiryDate)}
        </p>
      </div>
      {/* Notes Section */}
      <div className='w-2/3 mx-2'>
        <h3 className="text-lg font-semibold mb-2">Add Note</h3>
        <textarea className="textarea textarea-bordered w-full mb-2" value={noteText} onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..." disabled={!isOwner}/>
        <button className="btn btn-info btn-sm text-white" disabled={!isOwner || !noteText.trim()} onClick={handleAddNote}>Add Note</button>

        {!isOwner && (
          <p className="text-sm text-red-500 mt-1">You don't have permission to add notes on this item.</p>
        )}
      </div>
    </div>
    {/* Display Notes */}
    {notes.length > 0 && (
      <div className="w-2xl mx-auto my-2">
        <h3 className="text-lg font-semibold mb-1">Notes</h3>
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li key={index} className="w-2/3 md:w-full p-3 border rounded bg-gray-50">
              <p>{note.text}</p>
              <p className="text-xs text-gray-500 mt-1">Posted on: {moment(note.date).format('LLL')}</p>
            </li>
          ))}
        </ul>
      </div>
    )}
    </>
    );
    
};

export default FoodDetails;