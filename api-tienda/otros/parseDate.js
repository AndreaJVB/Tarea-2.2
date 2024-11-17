export const parseDate = (str) => {
    const parts = str.split(' ');
    if (parts.length !== 2) return null;
  
    const [datePart, timePart] = parts;
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
  
    // Crear un objeto Date con el formato adecuado
    const date = new Date(year, month - 1, day, hour, minute, second);
    
    // Comprobamos si la fecha es válida
    if (isNaN(date.getTime())) return null;
  
    return date;
  };