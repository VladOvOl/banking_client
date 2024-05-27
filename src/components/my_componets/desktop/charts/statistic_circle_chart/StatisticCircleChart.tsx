import React from 'react'
import style from './StatisticCircleChart.module.scss'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type Props = {}

function StatisticCircleChart({}: Props) {

  return (
    <div className={style.container}>
      <div className={style.containerChart}>
        <ResponsiveContainer width="100%" height="100%" className='relative'>
          <PieChart >
            <Pie
                data={data}
                innerRadius={'60%'}
                outerRadius={'80%'}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            
          </PieChart>
        </ResponsiveContainer>
        <p className={style.chart}>!!!!!!!!</p>  
      </div>
      
      </div>
     
  )
}

export default StatisticCircleChart