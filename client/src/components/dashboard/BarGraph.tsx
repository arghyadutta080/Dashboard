"use client";

import { SalesData } from "@/lib/types/dashboard/sales";
import { getWeeklySalesData } from "@/utils/functions/dashboard/getLast7Days";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesBarChart: React.FC = () => {
  const [data, setData] = useState<SalesData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const salesData = await getWeeklySalesData();
        setData(salesData);
        // console.log(salesData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesBarChart;
