import { CalendarDays } from 'lucide-react';
import React from 'react'

type Props = {}

function DateSpan({}: Props) {

    const now: Date = new Date();
    const day: number = now.getDate();
    const month: number = now.getMonth() + 1; 
    const year: number = now.getFullYear();
    const pad = (num: number): string => (num < 10 ? "0" : "") + num;

    
  return (
    <div className='flex items-center'>
      <CalendarDays/>
      <p className='text-l'>{`${pad(day)}.${pad(month)}.${year}`}</p>
    </div>
  )
}

export default DateSpan