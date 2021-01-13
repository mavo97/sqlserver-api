"use strict";

// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const format = require("../functions/functions");

async function saveLevantamientoObra(req, res) {
  console.log(req.body);

  const keylev = req.body.key;
  const nombreObra = req.body.nombreObra;
  const nombreTramoLicitacion = req.body.nombreTramoLicitacion;
  const longitud = req.body.longitud;
  const latitud = req.body.latitud;
  const keyUsuarioAprobacion = req.body.keyUsuarioAprobacion;
  const keyUsuarioLevantamiento = req.body.keyUsuarioLevantamiento;
  const keyCatTipoObra = req.body.keyCatTipoObra;
  const keyCatTipoLevantamiento = req.body.keyCatTipoLevantamiento;
  const keyCatEstatusValidacionObra = req.body.keyCatEstatusValidacionObra;
  const keyCatEstado = req.body.keyCatEstado;
  const keyCatDireccionAdjunta = req.body.keyCatDireccionAdjunta;
  const fechaRegistro = format.formatDate(req.body.fechaRegistro);
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);
  const fechaCreacion = format.formatDate(req.body.fechaCreacion);
  const fechaAprobacion = format.formatDate(req.body.fechaAprobacion);
  const keyCatMunicipio = req.body.keyCatMunicipio;

  try {
    if (req.body) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("keylev", sql.VarChar, keylev)
        .input("nombreObra", sql.VarChar, nombreObra)
        .input("nombreTramoLicitacion", sql.VarChar, nombreTramoLicitacion)
        .input("longitud", sql.Float, longitud)
        .input("latitud", sql.Float, latitud)
        .input("keyUsuarioAprobacion", sql.VarChar, keyUsuarioAprobacion)
        .input("keyUsuarioLevantamiento", sql.VarChar, keyUsuarioLevantamiento)
        .input("keyCatTipoObra", sql.VarChar, keyCatTipoObra)
        .input("keyCatTipoLevantamiento", sql.VarChar, keyCatTipoLevantamiento)
        .input(
          "keyCatEstatusValidacionObra",
          sql.VarChar,
          keyCatEstatusValidacionObra
        )
        .input("keyCatEstado", sql.VarChar, keyCatEstado)
        .input("keyCatDireccionAdjunta", sql.VarChar, keyCatDireccionAdjunta)
        .input("fechaRegistro", sql.Date, fechaRegistro)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .input("fechaAprobacion", sql.Date, fechaAprobacion)
        .input("keyCatMunicipio", sql.VarChar, keyCatMunicipio)
        .query(`INSERT INTO dbo.firebase_levantamiento_obra (keylev, nombreObra, nombreTramoLicitacion, longitud, latitud, keyUsuarioAprobacion,
                keyUsuarioLevantamiento, keyCatTipoObra, keyCatTipoLevantamiento, keyCatEstatusValidacionObra, keyCatEstado,
                keyCatDireccionAdjunta, fechaRegistro, fechaAprobacion, fechaActualizacion, fechaCreacion, keyCatMunicipio) 
                VALUES (@keylev, @nombreObra, @nombreTramoLicitacion, @longitud, @latitud, @keyUsuarioAprobacion, @keyUsuarioLevantamiento,
                    @keyCatTipoObra, @keyCatTipoLevantamiento, @keyCatEstatusValidacionObra, @keyCatEstado, @keyCatDireccionAdjunta,
                    @fechaRegistro, @fechaAprobacion, @fechaActualizacion, @fechaCreacion, @keyCatMunicipio);`);
    } else {
      res.status(503).send({
        levantamientoObra: "No se pudo crear el levantamiento de obra!",
      });
    }

    sql.close();
    return res
      .status(200)
      .send({ levantamientoObra: "levantamientoObra guardada!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${error}` });
  }
}

module.exports = {
  saveLevantamientoObra,
};
