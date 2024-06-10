import React from 'react'
import Container from '../../containers/dashboard_container/Container'
import { Tabs, TabsList, TabsTrigger,TabsContent } from '@/components/ui/tabs'
import style from './Dashboard.module.scss'

type Props = {}

function Dashboard({}: Props) {
  return (
    <Tabs defaultValue="week" className="w-[100%] h-[100%]">
      <div className="h-[10%] flex items-center justify-between">
        <TabsList className="flex w-fit ">
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
        </TabsList>
      </div>
      <TabsContent value="year" className='h-[90%] mt-0'>
        <Container period="all"/>
      </TabsContent>
      <TabsContent value="month" className='h-[90%] mt-0'>
        <Container period="month"/>
      </TabsContent>
      <TabsContent value="week" className='h-[90%] mt-0'>
        <Container period="week"/>
      </TabsContent>
      <TabsContent value="day" className='h-[90%] mt-0'>
        <Container period="day"/>
      </TabsContent>
    </Tabs>
  )
}

export default Dashboard

/**<Tabs defaultValue="account" className="h-[100%]">
      <TabsList className="grid w-[200px] grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" >
      <Container/>
      </TabsContent>
      <TabsContent value="password">
      <Container/>
      </TabsContent>
    </Tabs> */