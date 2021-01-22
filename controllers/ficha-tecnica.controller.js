"use strict";

// Database component
const sql = require("mssql"); // Drivers
const config = require("../config");
const uuid = require("uuid-random");
const format = require("../functions/functions");

async function saveDataSheet(req, res) {
  // console.log(req.body);

  const avanceFinanciero = req.body.avanceFinanciero;
  const avanceFinancieroGlobal = req.body.avanceFinancieroGlobal;
  const avanceFisico = req.body.avanceFisico;
  const avanceFisicoGlobal = req.body.avanceFisicoGlobal;
  const beneficios = req.body.beneficios;
  const caracteristicas = req.body.caracteristicas;
  const cus = req.body.cus;
  const esquemaFinanciamiento = req.body.esquemaFinanciamiento;
  const estado = req.body.estado;
  const estatusSHCP = req.body.estatusSHCP;
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);
  const fechaCreacion = req.body.fechaCreacion
    ? format.formatDate(req.body.fechaCracion)
    : format.formatDate(new Date());
  const incluyeImagenes = req.body.incluyeImagenes;
  const inversionTotal = req.body.inversionTotal;
  const keyCatCarpeta = req.body.keyCatCarpeta;
  const keyCatCorredor = req.body.keyCatCorredor;
  const keyCatOrigenRecursos = req.body.keyCatOrigenRecursos;
  const keyCatSeccion = req.body.keyCatSeccion;
  const keyCatTipoPrioridad = req.body.keyCatTipoPrioridad;
  const keyLevantamientoObra = req.body.keyLevantamientoObra;
  const keyUsuario = req.body.keyUsuario;
  const liberacionDerechoVia = req.body.liberacionDerechoVia;
  const longitudTotal = req.body.longitudTotal;
  const mia = req.body.mia;
  const observaciones = req.body.observaciones;
  const periodoEjecucion = req.body.periodoEjecucion;
  const problematica = req.body.problematica;
  const proximasAcciones = req.body.proximasAcciones;
  const proyectoEjecutivo = req.body.proyectoEjecutivo;
  const registroSHCP = req.body.registroSHCP;
  const tpda = req.body.tpda;
  const nombreObra = req.body.nombreObra;
  const nombreTramoLicitacion = req.body.nombreTramoLicitacion;
  const latitud = req.body.latitud;
  const longitud = req.body.longitud;
  const nombreEstado = req.body.nombreEstado;
  const ejerciciosFiscales = req.body.ejerciciosFiscales;

  // Generate id
  const id = uuid();

  try {
    if (req.body && ejerciciosFiscales) {
      let pool = await sql.connect(config);

      await pool
        .request()
        .input("uid", sql.VarChar, id)
        .input("avanceFinanciero", sql.Float, avanceFinanciero)
        .input("avanceFinancieroGlobal", sql.Float, avanceFinancieroGlobal)
        .input("avanceFisico", sql.Float, avanceFisico)
        .input("avanceFisicoGlobal", sql.Float, avanceFisicoGlobal)
        .input("beneficios", sql.VarChar, beneficios)
        .input("caracteristicas", sql.VarChar, caracteristicas)
        .input("cus", sql.VarChar, cus)
        .input("esquemaFinanciamiento", sql.VarChar, esquemaFinanciamiento)
        .input("estado", sql.VarChar, estado)
        .input("estatusSHCP", sql.VarChar, estatusSHCP)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .input("incluyeImagenes", sql.Bit, incluyeImagenes)
        .input("inversionTotal", sql.Float, inversionTotal)
        .input("keyCatCarpeta", sql.VarChar, keyCatCarpeta)
        .input("keyCatCorredor", sql.VarChar, keyCatCorredor)
        .input("keyCatOrigenRecursos", sql.VarChar, keyCatOrigenRecursos)
        .input("keyCatSeccion", sql.VarChar, keyCatSeccion)
        .input("keyCatTipoPrioridad", sql.VarChar, keyCatTipoPrioridad)
        .input("keyLevantamientoObra", sql.VarChar, keyLevantamientoObra)
        .input("keyUsuario", sql.VarChar, keyUsuario)
        .input("liberacionDerechoVia", sql.VarChar, liberacionDerechoVia)
        .input("longitudTotal", sql.Float, longitudTotal)
        .input("mia", sql.VarChar, mia)
        .input("observaciones", sql.VarChar, observaciones)
        .input("periodoEjecucion", sql.VarChar, periodoEjecucion)
        .input("problematica", sql.VarChar, problematica)
        .input("proximasAcciones", sql.VarChar, proximasAcciones)
        .input("proyectoEjecutivo", sql.VarChar, proyectoEjecutivo)
        .input("registroSHCP", sql.Float, registroSHCP)
        .input("tpda", sql.Float, tpda)
        .input("nombreObra", sql.VarChar, nombreObra)
        .input("nombreTramoLicitacion", sql.VarChar, nombreTramoLicitacion)
        .input("latitud", sql.VarChar, latitud)
        .input("longitud", sql.VarChar, longitud)
        .input("nombreEstado", sql.VarChar, nombreEstado)
        .query(`INSERT INTO dbo.firebase_ficha_tecnica (uid, avanceFinanciero, avanceFinancieroGlobal, avanceFisico, avanceFisicoGlobal,
                beneficios, caracteristicas, cus, esquemaFinanciamiento, estado, estatusSHCP, fechaActualizacion, fechaCreacion, incluyeImagenes,
                inversionTotal, keyCatCarpeta, keyCatCorredor, keyCatOrigenRecursos, keyCatSeccion, keyCatTipoPrioridad, keyLevantamientoObra,
                keyUsuario, liberacionDerechoVia, longitudTotal, mia, observaciones, periodoEjecucion, problematica, proximasAcciones, proyectoEjecutivo,
                registroSHCP, tpda, nombreObra, nombreTramoLicitacion, latitud, longitud, nombreEstado) VALUES (@uid, @avanceFinanciero, @avanceFinancieroGlobal, @avanceFisico, @avanceFisicoGlobal,
                    @beneficios, @caracteristicas, @cus, @esquemaFinanciamiento, @estado, @estatusSHCP, @fechaActualizacion, @fechaCreacion, @incluyeImagenes,
                    @inversionTotal, @keyCatCarpeta, @keyCatCorredor, @keyCatOrigenRecursos, @keyCatSeccion, @keyCatTipoPrioridad, @keyLevantamientoObra,
                    @keyUsuario, @liberacionDerechoVia, @longitudTotal, @mia, @observaciones, @periodoEjecucion, @problematica, @proximasAcciones, @proyectoEjecutivo,
                    @registroSHCP, @tpda, @nombreObra, @nombreTramoLicitacion, @latitud, @longitud, @nombreEstado);`);

      for (const item of ejerciciosFiscales) {
        const id2 = uuid();
        const asignacion = item.asignacion;
        const esquemaFiscal = item.esquemaFiscal;
        const letrasAsignacion = item.letrasAsignacion;
        const letrasEsquemaFiscal = item.letrasEsquemaFiscal;
        const letrasMeta = item.letrasMeta;
        const meta = item.meta;

        await sql.query`INSERT INTO dbo.firebase_ejercicios_fiscales (uid, asignacion, esquemaFiscal, letrasAsignacion, letrasEsquemaFiscal, 
                    letrasMeta, meta, fichaTecnicaId) VALUES (${id2}, ${asignacion}, ${esquemaFiscal}, ${letrasAsignacion}, ${letrasEsquemaFiscal},
                        ${letrasMeta}, ${meta}, ${id});`;
      }
    } else if (req.body) {
      let pool = await sql.connect(config);

      await pool
        .request()
        .input("uid", sql.VarChar, id)
        .input("avanceFinanciero", sql.Float, avanceFinanciero)
        .input("avanceFinancieroGlobal", sql.Float, avanceFinancieroGlobal)
        .input("avanceFisico", sql.Float, avanceFisico)
        .input("avanceFisicoGlobal", sql.Float, avanceFisicoGlobal)
        .input("beneficios", sql.VarChar, beneficios)
        .input("caracteristicas", sql.VarChar, caracteristicas)
        .input("cus", sql.VarChar, cus)
        .input("esquemaFinanciamiento", sql.VarChar, esquemaFinanciamiento)
        .input("estado", sql.VarChar, estado)
        .input("estatusSHCP", sql.VarChar, estatusSHCP)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("fechaCreacion", sql.Date, fechaCreacion)
        .input("incluyeImagenes", sql.Bit, incluyeImagenes)
        .input("inversionTotal", sql.Float, inversionTotal)
        .input("keyCatCarpeta", sql.VarChar, keyCatCarpeta)
        .input("keyCatCorredor", sql.VarChar, keyCatCorredor)
        .input("keyCatOrigenRecursos", sql.VarChar, keyCatOrigenRecursos)
        .input("keyCatSeccion", sql.VarChar, keyCatSeccion)
        .input("keyCatTipoPrioridad", sql.VarChar, keyCatTipoPrioridad)
        .input("keyLevantamientoObra", sql.VarChar, keyLevantamientoObra)
        .input("keyUsuario", sql.VarChar, keyUsuario)
        .input("liberacionDerechoVia", sql.VarChar, liberacionDerechoVia)
        .input("longitudTotal", sql.Float, longitudTotal)
        .input("mia", sql.VarChar, mia)
        .input("observaciones", sql.VarChar, observaciones)
        .input("periodoEjecucion", sql.VarChar, periodoEjecucion)
        .input("problematica", sql.VarChar, problematica)
        .input("proximasAcciones", sql.VarChar, proximasAcciones)
        .input("proyectoEjecutivo", sql.VarChar, proyectoEjecutivo)
        .input("registroSHCP", sql.Float, registroSHCP)
        .input("tpda", sql.Float, tpda)
        .input("nombreObra", sql.VarChar, nombreObra)
        .input("nombreTramoLicitacion", sql.VarChar, nombreTramoLicitacion)
        .input("latitud", sql.VarChar, latitud)
        .input("longitud", sql.VarChar, longitud)
        .input("nombreEstado", sql.VarChar, nombreEstado)
        .query(`INSERT INTO dbo.firebase_ficha_tecnica (uid, avanceFinanciero, avanceFinancieroGlobal, avanceFisico, avanceFisicoGlobal,
                beneficios, caracteristicas, cus, esquemaFinanciamiento, estado, estatusSHCP, fechaActualizacion, fechaCreacion, incluyeImagenes,
                inversionTotal, keyCatCarpeta, keyCatCorredor, keyCatOrigenRecursos, keyCatSeccion, keyCatTipoPrioridad, keyLevantamientoObra,
                keyUsuario, liberacionDerechoVia, longitudTotal, mia, observaciones, periodoEjecucion, problematica, proximasAcciones, proyectoEjecutivo,
                registroSHCP, tpda, nombreObra, nombreTramoLicitacion, latitud, longitud, nombreEstado) VALUES (@uid, @avanceFinanciero, @avanceFinancieroGlobal, @avanceFisico, @avanceFisicoGlobal,
                    @beneficios, @caracteristicas, @cus, @esquemaFinanciamiento, @estado, @estatusSHCP, @fechaActualizacion, @fechaCreacion, @incluyeImagenes,
                    @inversionTotal, @keyCatCarpeta, @keyCatCorredor, @keyCatOrigenRecursos, @keyCatSeccion, @keyCatTipoPrioridad, @keyLevantamientoObra,
                    @keyUsuario, @liberacionDerechoVia, @longitudTotal, @mia, @observaciones, @periodoEjecucion, @problematica, @proximasAcciones, @proyectoEjecutivo,
                    @registroSHCP, @tpda, @nombreObra, @nombreTramoLicitacion, @latitud, @longitud, @nombreEstado);`);
    } else {
      res.status(503).send({ ficha: "No se pudo crear la ficha!" });
      // console.log('hola');
    }
    // console.log('Si se pudo');
    // sql.close();
    return res.status(200).send({ ficha: "Ficha guardada!" });
  } catch (err) {
    // ... error checks
    console.log(err);
    return res
      .status(500)
      .send({ message: `Error al guardar en la base de datos: ${err}` });
  }
}

async function getDataSheet(req, res) {
  try {
    await sql.connect(config);
    const result = await sql.query`select * from dbo.firebase_ficha_tecnica`;
    // console.dir(result)
    if (!result)
      return res
        .status(404)
        .send({ message: `No hay ninguna ficha tecnica registrada!.` });
    const fichasTecnicas = result.recordsets;
    if (result) return res.status(200).send({ fichasTecnicas });
  } catch (err) {
    // ... error checks
    return res.status(500).send({ message: `Error al relizar la peticion..` });
  }

  sql.close();
}

async function getTaxData(req, res) {
  try {
    await sql.connect(config);
    const result = await sql.query`select * from dbo.firebase_ejercicios_fiscales`;
    // console.dir(result)
    if (!result)
      return res
        .status(404)
        .send({ message: `No hay ninguna ficha tecnica registrada!.` });
    const ejerciciosFiscales = result.recordsets;
    if (result) return res.status(200).send({ ejerciciosFiscales });
  } catch (err) {
    // ... error checks
    return res.status(500).send({ message: `Error al relizar la peticion..` });
  }

  sql.close();
}

async function getDataSheetById(req, res) {
  let dataId = req.params.dataId;

  try {
    await sql.connect(config);
    const result = await sql.query`select * from dbo.firebase_ficha_tecnica where uid = ${dataId}`;
    // console.dir(result)
    if (!result)
      return res.status(404).send({
        message: `No hay ninguna ficha tecnica registrada con ese Id!.`,
      });
    const fichaTecnica = result.recordsets;
    if (result) return res.status(200).send({ fichaTecnica });
  } catch (err) {
    // ... error checks
    return res.status(500).send({ message: `Error al relizar la peticion..` });
  }

  sql.close();
}

async function getTaxDataById(req, res) {
  let dataId = req.params.dataId;

  try {
    await sql.connect(config);
    const result = await sql.query`select * from dbo.firebase_ejercicios_fiscales where ficha_tecnicaID = ${dataId}`;
    // console.dir(result)
    if (!result)
      return res
        .status(404)
        .send({ message: `No hay ninguna ficha tecnica registrada!.` });
    const ejerciciosFiscales = result.recordsets;
    if (result) return res.status(200).send({ ejerciciosFiscales });
  } catch (err) {
    // ... error checks
    return res.status(500).send({ message: `Error al relizar la peticion..` });
  }

  sql.close();
}

async function callingUpdateDataSheet(req, res) {
  const avanceFinanciero = req.body.avanceFinanciero;
  const avanceFinancieroGlobal = req.body.avanceFinancieroGlobal;
  const avanceFisico = req.body.avanceFisico;
  const avanceFisicoGlobal = req.body.avanceFisicoGlobal;
  const beneficios = req.body.beneficios;
  const caracteristicas = req.body.caracteristicas;
  const cus = req.body.cus;
  const esquemaFinanciamiento = req.body.esquemaFinanciamiento;
  const estado = req.body.estado;
  const estatusSHCP = req.body.estatusSHCP;
  const fechaActualizacion = format.formatDate(req.body.fechaActualizacion);
  const incluyeImagenes = req.body.incluyeImagenes;
  const inversionTotal = req.body.inversionTotal;
  const keyCatCarpeta = req.body.keyCatCarpeta;
  const keyCatCorredor = req.body.keyCatCorredor;
  const keyCatOrigenRecursos = req.body.keyCatOrigenRecursos;
  const keyCatSeccion = req.body.keyCatSeccion;
  const keyCatTipoPrioridad = req.body.keyCatTipoPrioridad;
  const keyLevantamientoObra = req.body.keyLevantamientoObra;
  const keyUsuario = req.body.keyUsuario;
  const liberacionDerechoVia = req.body.liberacionDerechoVia;
  const longitudTotal = req.body.longitudTotal;
  const mia = req.body.mia;
  const observaciones = req.body.observaciones;
  const periodoEjecucion = req.body.periodoEjecucion;
  const problematica = req.body.problematica;
  const proximasAcciones = req.body.proximasAcciones;
  const proyectoEjecutivo = req.body.proyectoEjecutivo;
  const registroSHCP = req.body.registroSHCP;
  const tpda = req.body.tpda;
  const ejerciciosFiscales = req.body.ejerciciosFiscales;

  try {
    if (req.body && ejerciciosFiscales.length >= 1) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("avanceFinanciero", sql.Float, avanceFinanciero)
        .input("avanceFinancieroGlobal", sql.Float, avanceFinancieroGlobal)
        .input("avanceFisico", sql.Float, avanceFisico)
        .input("avanceFisicoGlobal", sql.Float, avanceFisicoGlobal)
        .input("beneficios", sql.Text, beneficios)
        .input("caracteristicas", sql.Text, caracteristicas)
        .input("cus", sql.Text, cus)
        .input("esquemaFinanciamiento", sql.Text, esquemaFinanciamiento)
        .input("estado", sql.Text, estado)
        .input("estatusSHCP", sql.Text, estatusSHCP)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("incluyeImagenes", sql.Bit, incluyeImagenes)
        .input("inversionTotal", sql.Float, inversionTotal)
        .input("keyCatCarpeta", sql.Text, keyCatCarpeta)
        .input("keyCatCorredor", sql.Text, keyCatCorredor)
        .input("keyCatOrigenRecursos", sql.Text, keyCatOrigenRecursos)
        .input("keyCatSeccion", sql.Text, keyCatSeccion)
        .input("keyCatTipoPrioridad", sql.Text, keyCatTipoPrioridad)
        .input("keyLevantamientoObra", sql.Text, keyLevantamientoObra)
        .input("keyUsuario", sql.Text, keyUsuario)
        .input("liberacionDerechoVia", sql.Text, liberacionDerechoVia)
        .input("longitudTotal", sql.Float, longitudTotal)
        .input("mia", sql.Text, mia)
        .input("observaciones", sql.Text, observaciones)
        .input("periodoEjecucion", sql.Text, periodoEjecucion)
        .input("problematica", sql.Text, problematica)
        .input("proximasAcciones", sql.Text, proximasAcciones)
        .input("proyectoEjecutivo", sql.Text, proyectoEjecutivo)
        .input("registroSHCP", sql.Float, registroSHCP)
        .input("tpda", sql.Float, tpda).query(`UPDATE dbo.firebase_ficha_tecnica
                        SET avanceFinanciero = @avanceFinanciero, avanceFinancieroGlobal = @avanceFinancieroGlobal, avanceFisico = @avanceFisico, 
                        avanceFisicoGlobal = @avanceFisicoGlobal, beneficios = @beneficios, caracteristicas = @caracteristicas, cus = @cus, 
                        esquemaFinanciamiento = @esquemaFinanciamiento, estado = @estado, estatusSHCP = @estatusSHCP, fechaActualizacion = @fechaActualizacion, 
                        incluyeImagenes = @incluyeImagenes, inversionTotal = @inversionTotal, keyCatCarpeta = @keyCatCarpeta, 
                        keyCatCorredor = @keyCatCorredor, keyCatOrigenRecursos = @keyCatOrigenRecursos, keyCatSeccion = @keyCatSeccion, 
                        keyCatTipoPrioridad = @keyCatTipoPrioridad, keyLevantamientoObra = @keyLevantamientoObra, keyUsuario = @keyUsuario, 
                        liberacionDerechoVia = @liberacionDerechoVia, longitudTotal = @longitudTotal, mia = @mia, observaciones = @observaciones, periodoEjecucion = @periodoEjecucion, 
                        problematica = @problematica, proximasAcciones = @proximasAcciones, proyectoEjecutivo = @proyectoEjecutivo,
                        registroSHCP = @registroSHCP, tpda = @tpda
                        WHERE
                        keyLevantamientoObra LIKE @keyLevantamientoObra;`);

      const result = await sql.query`select * from dbo.firebase_ficha_tecnica WHERE keyLevantamientoObra LIKE ${keyLevantamientoObra};`;
      // console.dir(result)
      const fichaTecnica = result.recordset;
      const fichaTecnicaId = fichaTecnica[0].uid;
      const results = await sql.query`SELECT * FROM dbo.firebase_ejercicios_fiscales WHERE fichaTecnicaId LIKE ${fichaTecnicaId};`;
      if (results) {
        await sql.query`DELETE FROM dbo.firebase_ejercicios_fiscales WHERE fichaTecnicaId LIKE ${fichaTecnicaId};`;
      }

      for (const item of ejerciciosFiscales) {
        const id2 = uuid();
        const asignacion = item.asignacion;
        const esquemaFiscal = item.esquemaFiscal;
        const letrasAsignacion = item.letrasAsignacion;
        const letrasEsquemaFiscal = item.letrasEsquemaFiscal;
        const letrasMeta = item.letrasMeta;
        const meta = item.meta;

        await sql.query`INSERT INTO dbo.firebase_ejercicios_fiscales (uid, asignacion, esquemaFiscal, letrasAsignacion, letrasEsquemaFiscal, 
            letrasMeta, meta, ficha_tecnicaID) VALUES (${id2}, ${asignacion}, ${esquemaFiscal}, ${letrasAsignacion}, ${letrasEsquemaFiscal},
                ${letrasMeta}, ${meta}, ${fichaTecnicaID});`;
      }
    } else if (req.body) {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("avanceFinanciero", sql.Float, avanceFinanciero)
        .input("avanceFinancieroGlobal", sql.Float, avanceFinancieroGlobal)
        .input("avanceFisico", sql.Float, avanceFisico)
        .input("avanceFisicoGlobal", sql.Float, avanceFisicoGlobal)
        .input("beneficios", sql.Text, beneficios)
        .input("caracteristicas", sql.Text, caracteristicas)
        .input("cus", sql.Text, cus)
        .input("esquemaFinanciamiento", sql.Text, esquemaFinanciamiento)
        .input("estado", sql.Text, estado)
        .input("estatusSHCP", sql.Text, estatusSHCP)
        .input("fechaActualizacion", sql.Date, fechaActualizacion)
        .input("incluyeImagenes", sql.Bit, incluyeImagenes)
        .input("inversionTotal", sql.Float, inversionTotal)
        .input("keyCatCarpeta", sql.Text, keyCatCarpeta)
        .input("keyCatCorredor", sql.Text, keyCatCorredor)
        .input("keyCatOrigenRecursos", sql.Text, keyCatOrigenRecursos)
        .input("keyCatSeccion", sql.Text, keyCatSeccion)
        .input("keyCatTipoPrioridad", sql.Text, keyCatTipoPrioridad)
        .input("keyLevantamientoObra", sql.Text, keyLevantamientoObra)
        .input("keyUsuario", sql.Text, keyUsuario)
        .input("liberacionDerechoVia", sql.Text, liberacionDerechoVia)
        .input("longitudTotal", sql.Float, longitudTotal)
        .input("mia", sql.Text, mia)
        .input("observaciones", sql.Text, observaciones)
        .input("periodoEjecucion", sql.Text, periodoEjecucion)
        .input("problematica", sql.Text, problematica)
        .input("proximasAcciones", sql.Text, proximasAcciones)
        .input("proyectoEjecutivo", sql.Text, proyectoEjecutivo)
        .input("registroSHCP", sql.Float, registroSHCP)
        .input("tpda", sql.Float, tpda).query(`UPDATE dbo.firebase_ficha_tecnica
                        SET avanceFinanciero = @avanceFinanciero, avanceFinancieroGlobal = @avanceFinancieroGlobal, avanceFisico = @avanceFisico, 
                        avanceFisicoGlobal = @avanceFisicoGlobal, beneficios = @beneficios, caracteristicas = @caracteristicas, cus = @cus, 
                        esquemaFinanciamiento = @esquemaFinanciamiento, estado = @estado, estatusSHCP = @estatusSHCP, fechaActualizacion = @fechaActualizacion, 
                        incluyeImagenes = @incluyeImagenes, inversionTotal = @inversionTotal, keyCatCarpeta = @keyCatCarpeta, 
                        keyCatCorredor = @keyCatCorredor, keyCatOrigenRecursos = @keyCatOrigenRecursos, keyCatSeccion = @keyCatSeccion, 
                        keyCatTipoPrioridad = @keyCatTipoPrioridad, keyLevantamientoObra = @keyLevantamientoObra, keyUsuario = @keyUsuario, 
                        liberacionDerechoVia = @liberacionDerechoVia, longitudTotal = @longitudTotal, mia = @mia, observaciones = @observaciones, periodoEjecucion = @periodoEjecucion, 
                        problematica = @problematica, proximasAcciones = @proximasAcciones, proyectoEjecutivo = @proyectoEjecutivo,
                        registroSHCP = @registroSHCP, tpda = @tpda
                        WHERE
                        keyLevantamientoObra LIKE @keyLevantamientoObra;`);

      const result = await sql.query`select * from dbo.firebase_ficha_tecnica WHERE keyLevantamientoObra LIKE ${keyLevantamientoObra};`;
      // console.dir(result)
      const fichaTecnica = result.recordset;
      const fichaTecnicaID = fichaTecnica[0].uid;
      const results = await sql.query`SELECT * FROM dbo.firebase_ejercicios_fiscales WHERE ficha_tecnicaID LIKE ${fichaTecnicaID};`;

      if (results) {
        await sql.query`DELETE FROM dbo.firebase_ejercicios_fiscales WHERE ficha_tecnicaID = ${fichaTecnicaID};`;
      }
    } else {
      res.status(503).send({ ficha: "No se pudo actualizar la ficha!" });
      // console.log('hola');
    }
    // console.log('Si se pudo');
    sql.close();
    return res.status(200).send({ ficha: "Ficha actualizada!" });
  } catch (err) {
    // ... error checks
    // return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
    console.log(err);
  }
}

async function updateDataSheet(req, res) {
  const keyLevantamientoObra = req.body.keyLevantamientoObra;

  try {
    await sql.connect(config);
    const fichaExiste = await sql.query`SELECT * FROM dbo.firebase_ficha_tecnica WHERE keyLevantamientoObra LIKE ${keyLevantamientoObra};`;
    //TODO: VALIDANDO SI LA FICHA EXISTE
    if (fichaExiste.recordset.length === 0) {
      saveDataSheet(req, res);
    } else {
      callingUpdateDataSheet(req, res);
    }
  } catch (err) {
    // ... error checks
    // return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
    console.log(err);
  }
}

async function saveDataSheet2(req, res) {
  const keyLevantamientoObra = req.body.keyLevantamientoObra;

  try {
    await sql.connect(config);
    const fichaExiste = await sql.query`SELECT * FROM dbo.firebase_ficha_tecnica WHERE keyLevantamientoObra LIKE ${keyLevantamientoObra};`;
    //TODO: VALIDANDO SI LA FICHA EXISTE
    if (fichaExiste.recordset.length === 0) {
      saveDataSheet(req, res);
    } else {
      console.log("Ya existe");

      return res.status(503).send({ ficha: "No se pudo actualizar la ficha!" });
    }
  } catch (err) {
    // ... error checks
    console.log(err);
    return res.status(500).send({ message: `Ya existe la ficha!: ${err}` });
  }
}

module.exports = {
  saveDataSheet,
  getDataSheet,
  getTaxData,
  getDataSheetById,
  getTaxDataById,
  updateDataSheet,
  saveDataSheet2,
};
