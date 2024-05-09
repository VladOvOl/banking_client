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
    }
    
}