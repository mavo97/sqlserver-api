"use strict";

// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const format = require("../functions/functions");
const uuid = require("uuid-random");

async function saveSegmento(req, res) {
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);
  const fechaCreacion = format.formatDate(req.body.fechaCreacion);
  const keyCapa = req.body.keyCapa;
  const keyCatColor = req.body.keyCatColor;
  const keyUsuarioCreacion = req.body.keyUsuarioCreacion;
  const longitud = req.body.longitud;
  const coordenadas = req.body.coordenadas;

  // Generate id
  const id = uuid();

  try {
    if (req.body && coordenadas.length >= 1) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("uid", sql.VarChar, id)
        .input("keyCapa", sql.VarChar, keyCapa)
        .input("longitud", sql.Float, longitud)
        .input("keyCatColor", sql.VarChar, keyCatColor)
        .input("keyUsuarioCreacion", sql.VarChar, keyUsuarioCreacion)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .query(`INSERT INTO dbo.segmentos (uid, keyCapa, longitud, keyCatColor, keyUsuarioCreacion,
                fechaActualizacion, fechaCreacion) VALUES (@uid, @keyCapa, @longitud, @keyCatColor, @keyUsuarioCreacion,
                            @fechaActualizacion, @fechaCreacion);`);
      
      await crearCoordenadas(coordenadas, id);
     
  } else if (req.body) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("uid", sql.VarChar, id)
        .input("keyCapa", sql.VarChar, keyCapa)
        .input("longitud", sql.Float, longitud)
        .input("keyCatColor", sql.VarChar, keyCatColor)
        .input("keyUsuarioCreacion", sql.VarChar, keyUsuarioCreacion)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .query(`INSERT INTO dbo.capas (uid, keyCapa, longitud, keyCatColor, keyUsuarioCreacion,
            fechaActualizacion, fechaCreacion, fechaRegistro) VALUES (@uid, @keyCapa, @longitud, @keyCatColor, @keyUsuarioCreacion,
                        @fechaActualizacion, @fechaCreacion);`);
  } else {
      res.status(503).send({ segmento: "No se pudo crear el segmento!" });
    }

    sql.close();
    return res.status(200).send({ segmento: "Capa guardada!" });

} catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${error}` });
  }
}

async function crearCoordenadas(coordenadas, id){
  await sql.connect(config);
  for (const coordenada of coordenadas) {
    const longitud = coordenada.longitud;
    const latitud = coordenada.latitud;
    const segmentoID = id;
    
    await sql.query`INSERT INTO dbo.coordenadas (longitud, latitud, segmentoID) VALUES (${longitud}, ${latitud}, ${segmentoID});`;

  }
}

module.exports = {
  saveSegmento,
};
