// Update in parentDash.tsx
import React from 'react';
import Card from "./card";

const Dashboard = () => {
  const items = [
    { title: "Total Sales", number: 1500, change: 10, icon: "/sales.svg" },
    { title: "Total Orders", number: 300, change: -5, icon: "/orders.svg" }, // Assuming default icon for orders
    { title: "Total Products", number: 1200, change: 8, icon: "/products.svg" }, // Assuming default icon for products
    { title: "Total Users", number: 500, change: 2, icon: "/user.svg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item, index) => (
        <Card key={index} item={item}  />
      ))}
    </div>
  );
};

export default Dashboard;