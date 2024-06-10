import { ISummary2 } from "@/services/transaction/transaction_utils.service";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle,
  } from "recharts";
  
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  interface IProps{
    array: ISummary2[]
  }

  
export default function StatisticBlockChart({array}:IProps) {
return (
    <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={array}
      margin={{
        top: 0,
        right: 0,
        left: -32,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="valueMinus" fill="#787878" activeBar={<Rectangle fill="#787878" stroke="black" />} />
      <Bar dataKey="valuePlus" fill="#C1C2C4" activeBar={<Rectangle fill="#C1C2C4" stroke="black" />} />
    </BarChart>
  </ResponsiveContainer>
);
}