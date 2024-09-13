export function formatDateToYYYYMMDD(date) {
  // Obtiene el año completo
  const year = date.getFullYear();

  // Obtiene el mes y agrega un 0 delante si es necesario
  const month = String(date.getMonth() + 1).padStart(2, "0");

  // Obtiene el día y agrega un 0 delante si es necesario
  const day = String(date.getDate()).padStart(2, "0");

  // Combina en el formato deseado
  return `${year}-${month}-${day}`;
}

export const getMonthName = (monthNumber) => {
  const months = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  return months[monthNumber - 1];
};
