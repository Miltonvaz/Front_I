import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export const  Graph = () => {
    const data = [
  {
    num: '4',
    a: 4,
    b: 3,
    c: 4,
    d: 7,
    e: 5,
    f: 0,
    
  },
  {
    num: '8',
    a: 6,
     b: 3,
    c: 4,
    d: 3,
    e: 3,
    f: 0,
    
  },
  {
    num: '12',
    a: 2,
    b: 3,
    c: 4,
    d: 4,
    e: 0,
    f: 0
    
  },
  {
    num: '16',
    a: 7,
    b: 3,
    c: 4,
    d: 12,
    e: 0,
    f: 0
   
    
  },
  {
    num: '20',
    a: 10,
    b: 3,
    c: 4,
    d: 12,
    e: 0,
    f: 0
    
    
  },
  {
    num: '24',
    a: 10,
     b: 3,
    c: 4,
    d: 12,
    e: 0,
    f: 3,
   
    
  },
  {
    num: '28',
    a: 6,
     b: 3,
    c: 4,
    d: 12,
    e: 0,
    f: 5,
    
  },
  {
    num: '2',
    a: 3,
     b: 3,
    c: 4,
    d: 12,
    e: 0,
    f: 2,
    
  },
];

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

    return (
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                stackOffset="expand"
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="num" />
                <YAxis tickFormatter={toPercent} />
                <Tooltip content={renderTooltipContent} />
                <Area type="monotone" dataKey="a" stackId="1" stroke="#ACEAD5" fill="#ACEAD5" />
                <Area type="monotone" dataKey="b" stackId="1" stroke="#DB9851" fill="#F6D5A8" />
                <Area type="monotone" dataKey="c" stackId="1" stroke="#918889" fill="#D1D1D1" />
                <Area type="monotone" dataKey="d" stackId="1" stroke="#296AD2" fill="#A1C3F0" />
                <Area type="monotone" dataKey="e" stackId="1" stroke="#EFDA63" fill="#FCEEA3" />
                <Area type="monotone" dataKey="f" stackId="1" stroke="#5ED2F7" fill="#AAECFC" />
            </AreaChart>
      </ResponsiveContainer>
    )
}