export const cardToolService = {

    maskCreditCardNumber(cardNumber: string): string {
        const digitsOnly = cardNumber.replace(/\D/g, '');
        const masked = digitsOnly.substring(0, 4) + ' ' +
                       digitsOnly.substring(4, 8).replace(/\d/g, '*') + ' ' +
                       digitsOnly.substring(8, 12).replace(/\d/g, '*') + ' ' +
                       digitsOnly.substring(12, 16);
        return masked;
    },

    formatCreditCardNumber(cardNumber: string): string {
        const digitsOnly = cardNumber.replace(/\s/g, '');
        const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formatted;
    }

}