const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON externo
const inputJsonPath = "./DatosScraping(originals).json";

// Ruta del archivo JSON de salida
const outputJsonPath = "./DatosScraping.json";

// Leer el archivo JSON externo
fs.readFile(inputJsonPath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parsear el JSON
  const jsonData = JSON.parse(data);

  // Filtrar los objetos con Image vacía
  const filteredJsonData = jsonData.filter((item) => item.Image !== "" && item.Reviews !== '');
  for (let i = 0; i < filteredJsonData.length; i++) {
    filteredJsonData[i]['id'] = i;
  }

  // Crear un nuevo archivo JSON con los objetos filtrados
  const outputJson = JSON.stringify(filteredJsonData, null, 2);

  // Escribir el archivo JSON de salida
  fs.writeFile(outputJsonPath, outputJson, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `Archivo JSON de salida creado correctamente en ${outputJsonPath}`
      );
    }
  });
});
