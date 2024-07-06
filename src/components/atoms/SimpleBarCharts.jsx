import React from 'react';
import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: "Sayuri", age: 19, weight: 60 },
  { name: "Joaquin", age: 21, weight: 71 },
  { name: "Milton", age: 19, weight: 62 },
];

function SimpleBarCharts() {
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={data} width={500} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="weight" fill="#6b48ff" />
        <Bar dataKey="age" fill="#1ee3cf" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarCharts;
