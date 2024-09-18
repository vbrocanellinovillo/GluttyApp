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

export function formatTime(date) {
  // Convierte la fecha a un objeto Date si no lo es
  const dateObj = new Date(date);

  // Obtiene las horas y los minutos
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  // Formatea para que siempre tenga 2 dígitos
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Retorna en formato HH:MM
  return `${hours}:${minutes}`;
}

export function formatShortMonth(date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
