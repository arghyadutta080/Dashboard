// components/PieChart.tsx
"use client";

import { ProductData } from "@/lib/types/dashboard/product";
import { getTopProducts } from "@/utils/functions/dashboard/dashboardDetails";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const ProductsPieChart: React.FC = () => {
  const [data, setData] = useState<ProductData[]>([]);

  // Define colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  useEffect(() => {
    const getData = async () => {
      try {
        const topProducts = await getTopProducts();
        setData(topProducts);
        // console.log(topProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="sales"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductsPieChart;
