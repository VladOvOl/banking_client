import { ITransaction } from "@/types/transaction.types";

export const dateAndTimeService = {

     extractDateAndTime(isoDateTime: string): { date: string, time: string } | null {
        try {
            const dt = new Date(isoDateTime);
            const date = `${dt.getDate().toString().padStart(2, '0')}.${(dt.getMonth() + 1).toString().padStart(2, '0')}.${dt.getFullYear()}`;
            const time = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
            return { date, time };
        } catch (error) {
            return null;
        }
    },

    getCurrentDateString(): string {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = currentDate.getFullYear();
    
        return `${day}.${month}.${year}`;
    },
    calculatePeriod(startDate: string, periodType: string, count: number): { startDate: string, endDate: string } {
        console.log(startDate,periodType,count)
        const formatDate = (date: Date): string => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };
    
        const parts = startDate.split('.').map(part => parseInt(part));
        const date = new Date(parts[2], parts[1] - 1, parts[0]); // Месяцы в JavaScript начинаются с 0
    
        const result = {
            startDate: '',
            endDate: ''
        };
    
        switch (periodType) {
            case 'day':
                date.setDate(date.getDate() + count);
                result.startDate = result.endDate = formatDate(date);
                break;
            case 'week':
                const startOfWeek = new Date(date);
                startOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1) + (count * 7));
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                result.startDate = formatDate(startOfWeek);
                result.endDate = formatDate(endOfWeek);
                break;
            case 'month':
                const startOfMonth = new Date(date.getFullYear(), date.getMonth() + count, 1);
                const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
                result.startDate = formatDate(startOfMonth);
                result.endDate = formatDate(endOfMonth);
                break;
            default:
                throw new Error('Invalid period type');
        }
    
        return result;
    }
     
}