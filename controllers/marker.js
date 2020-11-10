'use strict'
// Database component
const sql = require('mssql'); // Drivers
const config = require('../config');


async function getMarkers (req, res ) {

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query`select * from dbo.marker`
        console.dir(result)
        if (!result) return res.status(404).send({ message: `No existen marcadores` })
        const markers = result.recordsets;
        if (result) return res.status(200).send({ markers })

    } catch (err) {
        // ... error checks
        return res.status(500).send({ message: `Error al relizar la peticion..` })
    }

    sql.close();

}

async function saveMarker(req, res) {
    console.log('POST /api/product');
    console.log(req.body);

    const longitud = req.body.longitud
    const latitud = req.body.latitud

    try {
        // make sure that any items are correctly URL encoded in the connection string
        if( latitud && longitud ){
            await sql.connect(config)
            const result = await sql.query`INSERT INTO dbo.marker (latitud, longitud) VALUES (${latitud}, ${longitud});`
            // console.dir(result)
        }else{
            res.status(503).send({ marker: 'No se pudo crear el marcador!' })
            // console.log('hola');
        }
        // console.log('Si se pudo');
        sql.close();
        return res.status(200).send({ marker: 'Marcador guardado!' })
        

    } catch (err) {
        // ... error checks
        return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
    }

}

module.exports = {
    getMarkers,
    saveMarker
}