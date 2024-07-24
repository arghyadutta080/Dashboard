// components/BarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  sales: number;
}

const data: SalesData[] = [
  { date: '2024-07-15', sales: 120 },
  { date: '2024-07-16', sales: 98 },
  { date: '2024-07-17', sales: 150 },
  { date: '2024-07-18', sales: 130 },
  { date: '2024-07-19', sales: 110 },
  { date: '2024-07-20', sales: 170 },
  { date: '2024-07-21', sales: 90 },
];

const SalesBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
