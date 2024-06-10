import { ISummary } from '@/services/transaction/transaction_utils.service';
import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";


const COLORS = ['#000','#312927', '#2B2C31', '#554A4C','#47535F','#646770','#02122B','#868583'];



type Props = {
  arr:ISummary[]
}



const CircleChartDashboard = ({arr}: Props) => {

  
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <Pie
          data={arr}
          innerRadius={"70%"}
          outerRadius={"90%"}
          fill="#8884d8"
          dataKey="value"
        >
          {arr.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            formatter={(value, entry, index) => <span>{value}</span>} 
        />
      </PieChart>
      
    </ResponsiveContainer>

  )
}

export default CircleChartDashboard