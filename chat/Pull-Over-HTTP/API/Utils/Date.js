/**
 * @brief Obtiene un string con la fecha actual con el formato: "yyyy-mm-dd" y se 
 * le pasa el siguiente parametro ej: 'es-AR'
 * 
 * @param {string} localization - La localización deseada, ej: 'es-AR'
 * 
 * @returns {string} - La fecha actual en el formato "yyyy-mm-dd"
 */
module.exports = function getCurrentDate(localization) {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  let formattedDateTime = `${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};
