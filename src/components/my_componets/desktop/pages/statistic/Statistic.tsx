import React from 'react'
import StatisticContainer from '../../containers/statistic_container/StatisticContainer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StatisticPanel from '../../statistic_panel/StatisticPanel'
import StatisticCurrentDate from '@/components/my_ui/statistic_current_date/StatisticCurrentDate'


type Props = {}

function Statistic({}: Props) {
  return (
    <Tabs defaultValue="week" className="w-[100%] h-[100%]">
      <div className="h-[10%] flex items-center justify-between">
        <TabsList className="flex w-fit px-3 py-7 gap-3">
          <StatisticPanel/>
            <TabsTrigger value="year">
              Year
            </TabsTrigger>
            <TabsTrigger value="month">
              Month
            </TabsTrigger>
            <TabsTrigger value="week">
              Week
            </TabsTrigger>
            <TabsTrigger value="day">
              Day
            </TabsTrigger>
          <StatisticCurrentDate/>
        </TabsList>
      </div>
      <TabsContent value="year" className='h-[90%] mt-0'>
        <StatisticContainer period="all"/>
      </TabsContent>
      <TabsContent value="month" className='h-[90%] mt-0'>
        <StatisticContainer period="month"/>
      </TabsContent>
      <TabsContent value="week" className='h-[90%] mt-0'>
        <StatisticContainer period="week"/>
      </TabsContent>
      <TabsContent value="day" className='h-[90%] mt-0'>
        <StatisticContainer period="day"/>
      </TabsContent>
    </Tabs>
  )
}

export default Statistic