import { motion } from 'framer-motion';
import React from 'react';
import { MdKitchen, MdOutlineEco, MdOutlineLabel, MdOutlineStorage } from 'react-icons/md';

const StorageTips = () => {
    const tips=[
    {
        icon: <MdKitchen className="text-3xl text-green-700" />,
        title: "Fridge Door",
        text: "Avoid storing dairy in the fridge door – it's the warmest part.",
    },
    {
        icon: <MdOutlineStorage className="text-3xl text-green-700" />,
        title: "Airtight Storage",
        text: "Use airtight containers to keep food fresher longer.",
    },
    {
        icon: <MdOutlineLabel className="text-3xl text-green-700" />,
        title: "Label Everything",
        text: "Always label your containers with expiry or added date.",
    },
    {
        icon: <MdOutlineEco className="text-3xl text-green-700" />,
        title: "Separate Produce",
        text: "Keep fruits & veggies in separate drawers to avoid spoilage.",
    },
    ];
    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <h2 className="text-2xl text-green-700 font-bold text-center mb-6">Food Storage Tips</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tips.map((tip, index)=>(
                <motion.div key={index} whileHover={{ scale: 1.05, rotate: 1 }} transition={{ type: "spring", stiffness: 300 }}
                    className="bg-green-50 p-4 rounded-xl shadow hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-2">{tip.icon}
                    <h3 className="text-lg font-semibold">{tip.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{tip.text}</p>
                </motion.div>
                ))}
            </div>
        </div>

    );
};

export default StorageTips;