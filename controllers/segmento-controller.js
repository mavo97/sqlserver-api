"use strict";

// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const format = require("../functions/functions");
const uuid = require("uuid-random");
const polyUtil = require("polyline-encoded");

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
    await sql.connect(config);
    const results = await sql.query`SELECT * FROM dbo.firebase_segmentos WHERE longitud LIKE ${longitud} AND keyCapa LIKE ${keyCapa};`;
    console.log(results);
    if (results.recordset.length > 0) {
      console.log("No se creo nada");

      return res
        .status(503)
        .send({ segmento: "No se pudo crear el segmento!" });
    } else {
      console.log("Vamos a guardar");
      if (req.body && coordenadas) {
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
          .query(`INSERT INTO dbo.firebase_segmentos (uid, keyCapa, longitud, keyCatColor, keyUsuarioCreacion,
                    fechaActualizacion, fechaCreacion) VALUES (@uid, @keyCapa, @longitud, @keyCatColor, @keyUsuarioCreacion,
                                @fechaActualizacion, @fechaCreacion);`);

        // await crearCoordenadas(coordenadas, id);
        const latlngs = encodeCoordenadas(coordenadas);
        await crearCoordenadas(latlngs, id);
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
          .query(`INSERT INTO dbo.firebase_segmentos (uid, keyCapa, longitud, keyCatColor, keyUsuarioCreacion,
                    fechaActualizacion, fechaCreacion) VALUES (@uid, @keyCapa, @longitud, @keyCatColor, @keyUsuarioCreacion,
                                @fechaActualizacion, @fechaCreacion);`);
      }
    }
    // sql.close();
    console.log("Todo bien");
    return res.status(200).send({ segmento: "Segmento guardado!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${error}` });
  }
}

async function crearCoordenadas(latlngs, id) {
  const segmentoID = id;

  await sql.query`INSERT INTO dbo.firebase_coordenadas (latlngs, segmentoID) VALUES (${latlngs}, ${segmentoID});`;
}

// Funcion para codificar arreglo de coordenadas a una cadena de texto
function encodeCoordenadas(coordenadas) {
  const coordenadasDec = [];
  for (const coordenada of coordenadas) {
    coordenadasDec.push([coordenada.latitud, coordenada.longitud]);
  }

  const latlngs = polyUtil.encode(coordenadasDec);
  return latlngs;
}

// Función para eliminar un segmento
async function deleteSegmento(req, res) {
  const keyCapa = req.body.keyCapa;
  const longitud = req.body.longitud;

  try {
    await sql.connect(config);
    const queryy = await sql.query`SELECT * FROM dbo.firebase_segmentos WHERE longitud LIKE ${longitud} AND keyCapa LIKE ${keyCapa};`;
    const segmento = queryy.recordset;
    const segmentoID = segmento[0].uid;
    await deleteCoordenadas(segmentoID);
    const results = await sql.query`DELETE FROM dbo.firebase_segmentos WHERE longitud LIKE ${longitud} AND keyCapa LIKE ${keyCapa};`;
    if (results.rowsAffected > 0) {
      return res.status(200).send({ segmento: "Segmento eliminado!" });
    } else {
      return res
        .status(503)
        .send({ segmento: "No se pudo eliminar el segmento!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Error al eliminar en la base de datos: ${error}` });
  }
}

// Funcion para eliminar coordenadas
async function deleteCoordenadas(segmentoID) {
  try {
    const deleted = await sql.query`DELETE FROM dbo.firebase_coordenadas WHERE segmentoID LIKE ${segmentoID};`;
    console.log("Eliminados: ", deleted.rowsAffected);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  saveSegmento,
  deleteSegmento,
};
