import { ITransaction } from "@/types/transaction.types";

interface ISummary {
    name: string;
    value: number;
}

export const transactionUtilsService = {

    sumValues(objects: ITransaction[]): number {
        let sum = 0;
        objects.forEach(obj => {
            sum += obj.value;
        });
        return sum;
    },

    /*filterObjectsByDaysAgo(objects: ITransaction[], daysAgo: number): ITransaction[] {
        const currentDate: Date = new Date();
        const msPerDay: number = 24 * 60 * 60 * 1000;  

        const targetDate: Date = new Date(currentDate.getTime() - daysAgo * msPerDay);
        const filteredObjects: ITransaction[] = objects.filter(obj => {
            const objectDate: Date = new Date(obj.createdAt);
            return objectDate >= targetDate;
        });

        return filteredObjects;
    },
    */
    filterObjectsByPeriod(objects: ITransaction[], periodType: string): ITransaction[] {
        const currentDate: Date = new Date();
        let targetDate: Date;
    
        switch (periodType) {
            case 'day':
                // Установить targetDate на 00:00 текущего дня
                targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                targetDate.setHours(0, 0, 0, 0); // Сброс времени до 00:00:00.000
                break;
            
            case 'week':
                // Установить targetDate на понедельник текущей недели
                const currentDayOfWeek = currentDate.getDay();
                const daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Воскресенье считается как 6-й день с понедельника
                targetDate = new Date(currentDate);
                targetDate.setDate(currentDate.getDate() - daysSinceMonday);
                targetDate.setHours(0, 0, 0, 0); // Сброс времени до 00:00:00.000
                break;
    
            case 'month':
                // Установить targetDate на первый день текущего месяца
                targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                targetDate.setHours(0, 0, 0, 0); // Сброс времени до 00:00:00.000
                break;
    
            default:
                throw new Error('Неверный тип периода');
        }
    
        const filteredObjects: ITransaction[] = objects.filter(obj => {
            const objectDate: Date = new Date(obj.createdAt);
            return objectDate >= targetDate;
        });
    
        return filteredObjects;
    },
/*
    calculateHourlySums(transactions: ITransaction[]): IHourSummary[] {
        const hourlySums: IHourSummary[] = Array.from({ length: 24 }, (_, index) => ({
            name: index.toString(),
            value: 0,
        }));
    
        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.createdAt);
            const hour = transactionDate.getHours();
            hourlySums[hour].value += transaction.value;
        });
    
        return hourlySums;
    },
*/
    calculateSums(transactions: ITransaction[], periodType: string): ISummary[] {
        let summaries: ISummary[] = [];
    
        switch (periodType) {
            case 'day':
                summaries = Array.from({ length: 24 }, (_, index) => ({
                    name: (`${index+1}h`),
                    value: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const hour = transactionDate.getHours();
                    summaries[hour].value += transaction.value;
                });
                break;
    
            case 'week':
                const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
                summaries = daysOfWeek.map(day => ({
                    name: day,
                    value: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const day = (transactionDate.getDay() + 6) % 7; // Преобразование: Понедельник = 0, Воскресенье = 6
                    summaries[day].value += transaction.value;
                });
                break;
    
            case 'month':
                summaries = Array.from({ length: 5 }, (_, index) => ({
                    name: `Week ${index + 1}`,
                    value: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const week = Math.floor((transactionDate.getDate() - 1) / 7);
                    summaries[week].value += transaction.value;
                });
                break;

            case 'all':
            summaries = Array.from({ length: 12 }, (_, index) => ({
                name: `${index + 1}`,
                value: 0,
            }));

            transactions.forEach(transaction => {
                const transactionDate = new Date(transaction.createdAt);
                const month = transactionDate.getMonth();
                summaries[month].value += transaction.value;
            });
            break;
    
            default:
                throw new Error('Error type transaction utils service');
        }
    
        return summaries;
    }
}