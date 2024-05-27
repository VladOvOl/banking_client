import React from 'react'
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Group A", value: 1900 },
  { name: "Group B", value: 500 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const COLORS = ["#000", "#676767", "#9D9D9D", "#736464","#A3A3A3"];

type Props = {}

const CircleChart = (props: Props) => {
  return (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        //cx={120}
        //cy={200}
        innerRadius={55}
        outerRadius={70}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default CircleChart