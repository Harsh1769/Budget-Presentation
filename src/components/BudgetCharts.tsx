import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'];

interface ChartProps {
  data: { name: string; value: number }[];
  title: string;
}

export const RupeePieChart: React.FC<ChartProps> = ({ data = [], title }) => {
  if (!data || !Array.isArray(data)) return null;
  return (
    <div className="h-[400px] w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">{title} (in %)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AllocationBarChart: React.FC<{ data: any }> = ({ data }) => {
  const chartData = [
    { name: 'Agriculture', value: 1.65 },
    { name: 'Education', value: 1.25 },
    { name: 'Infrastructure', value: 12.5 },
  ];

  return (
    <div className="h-[400px] w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">Key Sector Allocations (₹ Lakh Cr)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
