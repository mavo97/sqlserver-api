// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const format = require("../functions/functions");

async function saveCatEstado(req, res) {
  const keyCatEstado = req.body.key;
  const nombre = req.body.nombre;
  const longitud = req.body.lng;
  const latitud = req.body.lat;
  const activo = req.body.activo;
  const fechaCreacion = format.formatDate(req.body.fechaCreacion);
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);

  try {
    if (req.body) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("keyCatEstado", sql.VarChar, keyCatEstado)
        .input("longitud", sql.Float, longitud)
        .input("latitud", sql.Float, latitud)
        .input("activo", sql.Bit, activo)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)

        .input("nombre", sql.VarChar, nombre)
        .query(`INSERT INTO dbo.firebase_catEstados ( keyCatEstado, longitud, latitud, activo, fechaActualizacion, fechaCreacion, nombre)
        VALUES (@keyCatEstado, @longitud, @latitud, @activo, @fechaActualizacion, @fechaCreacion, @nombre);`);
    } else {
      res
        .status(503)
        .send({ TipoEstado: "No se pudo crear el tipo de estado!" });
    }

    sql.close();
    return res.status(200).send({ TipoEstado: "Tipo de estado guardado!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${error}` });
  }
}

module.exports = {
  saveCatEstado,
};
