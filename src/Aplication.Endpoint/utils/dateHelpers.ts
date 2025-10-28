export function createOneYearExpirationDate(): Date {
    const expirationDate = new Date(); // Fecha y hora actual
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Sumar un año
    return expirationDate;
}