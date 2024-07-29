// Update in parentDash.tsx
import React from 'react';
import Card from './Card';
import { getOrders, getProducts, getSells } from '@/utils/functions/dashboard/dashboardDetails';


const Dashboard = () => {
  
  const items: any = [
    {
      title: "Total Sales",
      number: getSells() || "Loading...",
      change: 10,
      icon: "/sales.svg",
    },
    {
      title: "Total Orders",
      number: getOrders() || "Loading...",
      change: -5,
      icon: "/orders.svg",
    }, 
    {
      title: "Total Products",
      number: getProducts() || "Loading...",
      change: 8,
      icon: "/products.svg",
    }, 
    { title: "Total Users", number: 500, change: 2, icon: "/user.svg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item: any, index: number) => (
        <Card key={index} item={item}  />
      ))}
    </div>
  );
};

export default Dashboard;