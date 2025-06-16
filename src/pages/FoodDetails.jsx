import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const FoodDetails = () => {
    const {id} = useParams();
    const [food, setFood] = useState(null);

    useEffect(() => {
    axios.get(`http://localhost:3000/api/foods/${id}`).then((res) => {
      setFood(res.data);
      
    });
  }, [id]);

    const getTimeRemaining = (expiryDate) => {
    const now = moment();
    const expiry = moment(expiryDate);
    const duration = moment.duration(expiry.diff(now));
    if (duration.asMilliseconds() < 0) return "Expired";
    return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m remaining`;
  };

  if (!food) {
        return <div className="text-center text-gray-500 mt-10">Loading food details...</div>;
    }

return (
    <div className="max-w-3xl mx-auto p-4">
        <img src={food.foodImage} alt={food.title} className="rounded-2xl w-full h-64 object-cover" />
        <p className="text-2xl font-bold">{food.foodTitle}</p>
        <p className="text-gray-700">{food.description}</p>
        <p>Category: {food.category}</p>
        <p>Quantity: {food.quantity}</p>
        <p>Expiry Date: {moment(food.expiryDate).format("YYYY-MM-DD")}</p>
        <p className="font-medium text-red-500 mt-2">
            {getTimeRemaining(food.expiryDate)}
        </p>
    </div>
);
};

export default FoodDetails;