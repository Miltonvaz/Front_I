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

const StackedAreaCharts = ({ data }) => {
  return (
      <ResponsiveContainer width='100%' aspect={4}>
          <AreaChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Area
                  type='monotone'
                  dataKey='total_sold'
                  stackId='1'
                  stroke='#55f'
                  fill='#55f'
              />
              <Area
                  type='monotone'
                  dataKey='another_metric'
                  stackId='1'
                  stroke='#ccc'
                  fill='#ccc'
              />
          </AreaChart>
      </ResponsiveContainer>
  );
};

export default StackedAreaCharts;