import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6'];

interface ChartProps {
  data: { name: string; value: number }[];
  title: string;
}

export const RupeePieChart: React.FC<ChartProps> = ({ data = [], title }) => {
  if (!data || !Array.isArray(data)) return null;
  return (
    <div className="h-[500px] w-full flex flex-col items-center">
      <h3 className="text-sm font-black mb-6 text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={130}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            label={({ name, value }) => `${name} (${value}%)`}
            labelLine={true}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AllocationBarChart: React.FC<{ data: any }> = ({ data }) => {
  const chartData = [
    { name: 'Agriculture', value: parseFloat(data?.agriculture?.match(/[\d.]+/)?.[0] || "1.62") },
    { name: 'Education', value: parseFloat(data?.education?.match(/[\d.]+/)?.[0] || "1.39") },
    { name: 'Infrastructure', value: parseFloat(data?.infrastructure?.match(/[\d.]+/)?.[0] || "12.2") },
  ];

  return (
    <div className="h-[400px] w-full flex flex-col items-center">
      <h3 className="text-sm font-black mb-6 text-slate-400 uppercase tracking-[0.2em]">Sector Allocations (₹ Lakh Cr)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} label={{ position: 'top', fill: '#6366f1', fontWeight: 'bold', fontSize: 14 }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
