"use client";

import { ProductData } from "@/lib/types/dashboard/product";
import { getTopProducts } from "@/utils/functions/dashboard/dashboardDetails";
import React, { useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CircleLoader from "react-spinners/ClipLoader";

const ProductsPieChart: React.FC = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dataFetchedRef = useRef(false);

  // Define colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  useEffect(() => {
    const getData = async () => {
      try {
          const topProducts = await getTopProducts();
          topProducts && setData(topProducts);
          setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!dataFetchedRef.current) {    // check with useRef to prevent multiple calls by useEffect
      dataFetchedRef.current = true;
      getData();
    }
  }, []);

  return (
    <div
      className={`${
        loading && "h-full flex flex-col justify-center items-center"
      }`}
    >
      {loading ? (
        <CircleLoader
          color={"#FF6384"}
          loading={true}
          size={220}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProductsPieChart;
