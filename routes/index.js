"use strict";

const express = require("express");
const api = express.Router();
const datasheetCtrl = require("../controllers/ficha-tecnica.controller");
const capasCtrl = require("../controllers/capa-controller");
const segmentosCtrl = require("../controllers/segmento-controller");
const levantamientoCtrl = require("../controllers/levantamiento-obra-controller");
const tipoCapaCtrl = require("../controllers/tipocapa-controller");
const tipoEstadoCtrl = require("../controllers/catestado-controller");

// Guarda una ficha tecnica
api.post("/save-datasheet", datasheetCtrl.saveDataSheet2);
// Muestra las fichas tecnicas registradas
api.get("/datasheets", datasheetCtrl.getDataSheet);
// Muestra una ficha tecnica por su ID
api.get("/datasheet/:dataId", datasheetCtrl.getDataSheetById);
// Muestra los ejercicios fiscales
api.get("/taxdata", datasheetCtrl.getTaxData);
// Muestra los ejercicios fiscales por ID
api.get("/taxdata/:dataId", datasheetCtrl.getTaxDataById);
// Actualizar ficha tecnica
api.post("/update-datasheet", datasheetCtrl.updateDataSheet);
// Crear capa
api.post("/crear-capa", capasCtrl.saveCapa);
// Crear segmento
api.post("/crear-segmento", segmentosCtrl.saveSegmento);
// Crear levantamiento de obra
api.post("/crear-levantamiento", levantamientoCtrl.saveLevantamientoObra);
// Crear levantamiento de obra
api.post("/crear-tipocapa", tipoCapaCtrl.saveTipoCapa);
// Crear estado en catalogo de estados
api.post("/crear-estado", tipoEstadoCtrl.saveCatEstado);

module.exports = api;
