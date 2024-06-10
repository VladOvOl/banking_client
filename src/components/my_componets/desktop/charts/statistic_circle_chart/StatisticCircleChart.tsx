import React, { useCallback, useState } from 'react'
import style from './StatisticCircleChart.module.scss'
import { Bar, Cell, Pie, PieChart, Rectangle, ResponsiveContainer, Sector } from 'recharts'
import { ISummary } from '@/services/transaction/transaction_utils.service';
import {DollarSignIcon} from 'lucide-react'

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FF8042',
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FF8042'];

type Props = {
  array: ISummary[]
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text 
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      ><>{`Value: ${value}`}<DollarSignIcon width={10} hanging={10}/></></text>
      <text 
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={15}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function StatisticCircleChart({array}:Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_:any, index:any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer width="100%" height="100%" className='relative flex justify-center'>
    <PieChart>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={array}
        innerRadius={"35%"}
        outerRadius={"60%"}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    </ResponsiveContainer>
  );
}

export default StatisticCircleChart

/**<div className={style.container}>
      <div className={style.containerChart}>
        <ResponsiveContainer width="100%" height="100%" className='relative'>
          <PieChart >
            <Pie
                data={array}
                innerRadius={'45%'}
                outerRadius={'60%'}
                fill="#8884d8"
                paddingAngle={10}
                dataKey="value"
            >
              {array.map((obj) => (
                <Cell key={`cell-${obj.value}`} fill={COLORS[obj.value % COLORS.length]} />
              ))}
            </Pie>
            
          </PieChart>
        </ResponsiveContainer>
        <p className={style.chart}>!!!!!!!!</p>  
      </div>
      
      </div> */