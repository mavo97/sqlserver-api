"use strict";

// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const format = require("../functions/functions");

async function saveTipoCapa(req, res) {
  const keyCat = req.body.key;
  const descripcion = req.body.descripcion;
  const activo = req.body.activo;
  const fechaCreacion = format.formatDate(req.body.fechaCreacion);
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);
  const nombre = req.body.nombre;

  try {
    if (req.body) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("keyCat", sql.Float, keyCat)
        .input("descripcion", sql.VarChar, descripcion)
        .input("activo", sql.Bit, activo)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)

        .input("nombre", sql.VarChar, nombre)
        .query(`INSERT INTO dbo.firebase_catTipoCapaObra ( keyCat, descripcion, activo, fechaActualizacion, fechaCreacion, nombre)
        VALUES (@keyCat, @descripcion, @activo, @fechaActualizacion, @fechaCreacion, @nombre);`);
    } else {
      res.status(503).send({ TipoCapa: "No se pudo crear el tipo de capa!" });
    }

    sql.close();
    return res.status(200).send({ TipoCapa: "Tipo de capa guardado!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${error}` });
  }
}

module.exports = {
  saveTipoCapa,
};
