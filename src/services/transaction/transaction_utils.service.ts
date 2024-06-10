import { ITransaction } from "@/types/transaction.types";

export interface ISummary {
    name: string;
    value: number;
}


export interface ISummary2 {
    name: string;
    valuePlus: number;
    valueMinus:number;
}

interface FilteredResult {
    filteredObjects: ITransaction[];
    startDateString: string;
    endDateString: string;
}

export const transactionUtilsService = {
    sumValues(objects: ITransaction[]): number {
        let sum = 0;
        objects.forEach(obj => {
            sum += obj.value;
        });
        return sum;
    },

    //DASHBOARD

    filterObjectsByPeriod(objects: ITransaction[], periodType: string, count:number): ITransaction[] {
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
                targetDate.setDate(targetDate.getDate() + (count * 7));
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
    },

    formatDate(dateString: string): string {
        // Создаем объект Date из входной строки
        const date = new Date(dateString);
    
        // Получаем день, месяц и год из объекта Date
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы в JavaScript начинаются с 0
        const year = date.getFullYear();
    
        // Форматируем дату в нужный формат
        return `${day}.${month}.${year}`;
    },

    summarizeTransactionsByType(transactions: ITransaction[]): ISummary[] {
        const transactionTypes: ITransaction["typeTransaction"][] = ["transfer", "communal", "internet", "mobile", "television", "charity", "games", "tickets"];
    
        const summary: ISummary[] = transactionTypes.map(type => {
            const total = transactions
                .filter(transaction => transaction.typeTransaction === type)
                .reduce((sum, transaction) => sum + transaction.value, 0);
            return { name: type, value: total };
        });
    
        return summary;
    },

    //STATISTIC
    filterObjectsByPeriodToStatistic(objects: ITransaction[], periodType: string, count: number): FilteredResult {
        const currentDate: Date = new Date();
        let startDate: Date;
        let endDate: Date;
        
    
        switch (periodType) {
            case 'day':
                // Установить startDate и endDate на текущий день с учетом count
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                startDate.setDate(startDate.getDate() + (count * 1)); // Сдвиг на count дней
                startDate.setHours(0, 0, 0, 0); // Сброс времени до 00:00:00.000
    
                endDate = new Date(startDate);
                endDate.setHours(23, 59, 59, 999); // Конец текущего дня
                break;
            
            case 'week':
                // Установить startDate на понедельник текущей недели с учетом count
                const currentDayOfWeek = currentDate.getDay();
                const daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Воскресенье считается как 6-й день с понедельника
                startDate = new Date(currentDate);
                startDate.setDate(startDate.getDate() - daysSinceMonday); // Устанавливаем на понедельник текущей недели
                startDate.setDate(startDate.getDate() + (count * 7)); // Сдвиг на count недель
                startDate.setHours(0, 0, 0, 0); // Сброс времени до 00:00:00.000
    
                // Установить endDate на воскресенье той же недели
                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999); // Конец дня воскресенья
                break;
    
            case 'month':
                // Установить startDate на первый день текущего месяца с учетом count
                const currentMonth = currentDate.getMonth();
                const targetMonth = currentMonth + count;
                startDate = new Date(currentDate.getFullYear(), targetMonth, 1);
                startDate.setHours(0, 0, 0, 0); // Сброс времени до 00:00:00.000
    
                // Установить endDate на последний день текущего месяца
                endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                endDate.setHours(23, 59, 59, 999); // Конец дня последнего дня месяца
                break;
    
            default:
                throw new Error('Неверный тип периода');
        }
    
        const filteredObjects: ITransaction[] = objects.filter(obj => {
            const objectDate: Date = new Date(obj.createdAt);
            return objectDate >= startDate && objectDate <= endDate;
        });

        let startDateString = this.formatDate(startDate.toString())
        let endDateString = this.formatDate(endDate.toString())
    
        return {
            filteredObjects,
            startDateString,
            endDateString
        };
    },
    calculateSums2(transactions: ITransaction[], periodType: string): ISummary2[] {
        let summaries: ISummary2[] = [];
    
        switch (periodType) {
            case 'day':
                summaries = Array.from({ length: 24 }, (_, index) => ({
                    name: `${index + 1}h`,
                    valuePlus: 0,
                    valueMinus: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const hour = transactionDate.getHours();
                    if (transaction.process === '+') {
                        summaries[hour].valuePlus += transaction.value;
                    } else if (transaction.process === '-') {
                        summaries[hour].valueMinus += transaction.value;
                    }
                });
                break;
    
            case 'week':
                const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
                summaries = daysOfWeek.map(day => ({
                    name: day,
                    valuePlus: 0,
                    valueMinus: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const day = (transactionDate.getDay() + 6) % 7; // Преобразование: Понедельник = 0, Воскресенье = 6
                    if (transaction.process === '+') {
                        summaries[day].valuePlus += transaction.value;
                    } else if (transaction.process === '-') {
                        summaries[day].valueMinus += transaction.value;
                    }
                });
                break;
    
            case 'month':
                summaries = Array.from({ length: 5 }, (_, index) => ({
                    name: `Week ${index + 1}`,
                    valuePlus: 0,
                    valueMinus: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const week = Math.floor((transactionDate.getDate() - 1) / 7);
                    if (transaction.process === '+') {
                        summaries[week].valuePlus += transaction.value;
                    } else if (transaction.process === '-') {
                        summaries[week].valueMinus += transaction.value;
                    }
                });
                break;
    
            case 'all':
                summaries = Array.from({ length: 12 }, (_, index) => ({
                    name: `${index + 1}`,
                    valuePlus: 0,
                    valueMinus: 0,
                }));
    
                transactions.forEach(transaction => {
                    const transactionDate = new Date(transaction.createdAt);
                    const month = transactionDate.getMonth();
                    if (transaction.process === '+') {
                        summaries[month].valuePlus += transaction.value;
                    } else if (transaction.process === '-') {
                        summaries[month].valueMinus += transaction.value;
                    }
                });
                break;
    
            default:
                throw new Error('Error type transaction utils service');
        }
    
        return summaries;
    }
}