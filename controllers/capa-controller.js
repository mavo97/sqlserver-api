"use strict";

// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const format = require("../functions/functions");

async function saveCapa(req, res) {
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);
  const fechaCreacion = format.formatDate(req.body.fechaCreacion);
  const keyCatCapa = req.body.keyCatCapa;
  const keyLevantamientoObra = req.body.keyLevantamientoObra;
  const keyUsuarioCreacion = req.body.keyUsuarioCreacion;
  const keyCapa = req.body.key;

  try {
    if (req.body) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("keyCapa", sql.VarChar, keyCapa)
        .input("keyCatCapa", sql.Float, keyCatCapa)
        .input("keyLevantamientoObra", sql.VarChar, keyLevantamientoObra)
        .input("keyUsuarioCreacion", sql.VarChar, keyUsuarioCreacion)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .query(`INSERT INTO dbo.firebase_capas (keyCapa, keyCatCapa, keyLevantamientoObra, keyUsuarioCreacion, fechaActualizacion,
            fechaCreacion) VALUES (@keyCapa, @keyCatCapa, @keyLevantamientoObra, @keyUsuarioCreacion, @fechaActualizacion,
                        @fechaCreacion);`);
    } else {
      res.status(503).send({ capa: "No se pudo crear la capa!" });
    }

    sql.close();
    return res.status(200).send({ Capa: "Capa guardada!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${error}` });
  }
}

module.exports = {
  saveCapa,
};
