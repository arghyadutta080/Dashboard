"use client";

import { SalesData } from "@/lib/types/dashboard/sales";
import { getWeeklySalesData } from "@/utils/functions/dashboard/getLast7Days";
import React, { CSSProperties, useEffect, useState } from "react";
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
import CircleLoader from "react-spinners/ClipLoader";

const SalesBarChart: React.FC = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if (data.length > 0) return;
        const salesData = await getWeeklySalesData();
        setData(salesData);
        // console.log(salesData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className={`${loading && "h-full flex flex-col justify-center items-center"}`}>
      {loading ? (
        <CircleLoader
          color={"#8884d8"}
          loading={true}
          // cssOverride={override}
          size={220}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <ResponsiveContainer
          width="100%"
          height={400}
        >
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
      )}
    </div>
  );
};

export default SalesBarChart;
