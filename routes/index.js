'use strict'

const express = require('express')
const api = express.Router()
const markerCtrl = require('../controllers/marker')
const datasheetCtrl = require('../controllers/ficha-tecnica.controller')
// muestra marcadores
api.get('/markers', markerCtrl.getMarkers)
// Guarda un marcador
api.post('/save-marker', markerCtrl.saveMarker)
// Guarda una ficha tecnica
api.post('/save-datasheet', datasheetCtrl.saveDataSheet)
// Muestra las fichas tecnicas registradas
api.get('/datasheets', datasheetCtrl.getDataSheet)
// Muestra una ficha tecnica por su ID
api.get('/datasheet/:dataId', datasheetCtrl.getDataSheetById)
// Muestra los ejercicios fiscales
api.get('/taxdata', datasheetCtrl.getTaxData)
// Muestra los ejercicios fiscales por ID
api.get('/taxdata/:dataId', datasheetCtrl.getTaxDataById)
// Actualizar ficha tecnica
api.post('/update-datasheet', datasheetCtrl.updateDataSheet)

module.exports = api