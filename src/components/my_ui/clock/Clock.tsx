'use client'
import { Clock4Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {}

function Clock({}: Props) {
    const [time, setTime] = useState('')

    useEffect(() => {
  
      setInterval(() => {
  
        const dateObject = new Date()
  
        const hour = dateObject.getHours()
        const min = dateObject.getMinutes()
        const minute = (num: number): string => (num < 10 ? "0" : "") + num;
        const sec = dateObject.getSeconds()
        const second = (num: number): string => (num < 10 ? "0" : "") + num;
  
        const currentTime = hour + ' : ' + minute(min) + ' : ' + second(sec)
        
        setTime(currentTime)
      }, 1000)
  
    }, [time])
    
  
    return <div className='w-[114px] flex items-center'>
            <Clock4Icon/>
            <p className='text-l'>{time}</p>
          </div>

            
}

export default Clock