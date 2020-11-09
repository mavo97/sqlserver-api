'use strict'

const express = require('express')
const api = express.Router()
const markerCtrl = require('../controllers/marker')

api.get('/markers', markerCtrl.getMarkers)
api.post('/save-marker', markerCtrl.saveMarker)

module.exports = api