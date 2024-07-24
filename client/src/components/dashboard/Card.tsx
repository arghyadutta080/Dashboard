// Update in Card.tsx
import React from 'react';


interface CardProps {
    item: {
      title: string;
      number: number;
      change: number;
      icon : string;
    };
  }
  const Card: React.FC<CardProps> = ({ item  }) => {
  return (
    <div className="bg-[#c77dff] p-5 rounded-lg mt-2 mx-2 flex flex-col gap-5 cursor-pointer hover:bg-gray-700">
      <div className="flex items-center gap-2">
        <img src={item.icon} alt="Icon" className="h-10 w-15" /> 
        <span className="text-white font-semibold text-lg">{item.title}</span>
      </div>
      <div>
        <span className="text-2xl font-medium text-white">{item.number}</span>
      </div>
     
    </div>
  );
};

export default Card;