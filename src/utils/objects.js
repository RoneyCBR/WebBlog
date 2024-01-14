export const combineWithForm = (form, mapObject) => {
  if (!mapObject) return { ...form };  // Retorna una copia de form si mapObject no está definido
  
  const newForm = { ...form };  // Crea una nueva copia de form
  Object.keys(mapObject).forEach(key => {
    console.log('debug combineWithForm::',key);
    newForm[key] = mapObject[key];  // Modifica la nueva copia
  });

  return newForm;  // Retorna la nueva copia
}
