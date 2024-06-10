import { dateAndTimeService } from "@/services/tools/dateAndTime.service";
import { ICreateTransaction, ITransaction } from "@/types/transaction.types";

import { create } from "zustand";

interface IStatisticStore{
    count: number;
    periodState:string;
    startDate: string,
    endDate: string,
    date: { startDate: string; endDate: string; },
    setPeriod: (dto:string) => void;
    setCount: (dto:number)=>void;
    setDate: (dto:number)=> void,
    setDate2: (dto:{ startDate: string; endDate: string; })=> void

    
} 

export const useStatisticStore = create<IStatisticStore>()((set)=>({
    count:0,
    periodState:"week",
    setPeriod:(dto) => set(()=>({
        periodState:dto
    })),
    startDate: "dateAndTimeService.getCurrentDateString()",
    endDate: `dat`, 
    date: dateAndTimeService.calculatePeriod(dateAndTimeService.getCurrentDateString(),"week",0),

    setCount: (dto)=>set(()=>({
        count:dto
    })),
    setDate: (dto)=>set(()=>({
        //date:dateAndTimeService.calculatePeriod(dateAndTimeService.getCurrentDateString(),"week",dto)
    })),

    setDate2: (dto)=>set(()=>({
        date:{
            startDate:dto.startDate,
            endDate:dto.endDate
        }
    })) 
    }))