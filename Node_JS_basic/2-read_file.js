const fs = require('fs');

function countStudents(path) {
  try {
    // Lee de forma síncrona el contenido del archivo especificado en 'path' con codificación 'utf8'.
    const data = fs.readFileSync(path, 'utf8');

    // Divide el contenido del archivo en líneas y filtra aquellas líneas que no estén en blanco.
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Verifica si hay al menos una línea válida (no vacía) en el archivo.
    if (lines.length === 0) {
      throw new Error('No se encontraron datos de estudiantes en el archivo');
    }

    // Utiliza map para extraer los campos de cada línea, y slice(3) para ignorar los primeros tres elementos.
    const fields = lines.map((line) => line.split(',').slice(3));

    // Crea un objeto de recuentos usando reduce.
    const fieldCounts = fields.reduce((counts, [field, ...rest]) => {
      counts[field] = (counts[field] || 0) + 1;
      return counts;
    }, {});

    // Imprime el número total de estudiantes.
    console.log(`Número de estudiantes: ${fields.length}`);

    // Itera sobre las propiedades del objeto 'fieldCounts' e imprime el recuento de estudiantes por campo.
    for (const field in fieldCounts) {
      if (fieldCounts.hasOwnProperty(field)) {
        const studentsSet = new Set(fields
          .filter(([f]) => f === field)
          .map(([, ...rest]) => rest.join(', ').trim())
        );

        console.log(`Número de estudiantes en ${field}: ${fieldCounts[field]}. Lista: ${Array.from(studentsSet).join(', ')}`);
      }
    }
  } catch (error) {
    // Captura y maneja cualquier error que ocurra durante la lectura del archivo.
    throw new Error('No se puede cargar la base de datos');
  }
}

module.exports = countStudents;

