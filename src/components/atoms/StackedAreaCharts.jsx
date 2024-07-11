import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
  } from 'recharts';
  
  import React from 'react';
  const data = [
    { name: 'Joaquín', age: 29, weight: 80 },
    { name: 'Paolo', age: 18, weight: 74 },
    { name: 'Vanessa', age: 29, weight: 65 },
    { name: 'Omar', age: 24, weight: 80 },
    { name: 'Claudia', age: 40, weight: 68 },
    { name: 'Mauro', age: 43, weight: 120 },
    { name: 'Facundo', age: 13, weight: 60 },
    { name: 'Agustina', age: 27, weight: 70 },
  ];
  
  const StackedAreaCharts = () => {
    return (
      <>
        <ResponsiveContainer width='100%' aspect={4}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='age'
              stackId='1'
              stroke='#55f'
              fill='#55f'
            />
            <Area
              type='monotone'
              dataKey='weight'
              stackId='1'
              stroke='#ccc'
              fill='#ccc'
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    );
  };
  
  export default StackedAreaCharts;