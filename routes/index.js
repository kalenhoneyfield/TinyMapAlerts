const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', {layout: 'default', template: 'home-template'})
})

router.get('/map', function(req, res, next) {
    res.render('tinymap', {layout: 'map', template: 'home-template'})
  })

router.get('/alerts', function(req, res, next) {
    res.render('alerts', {layout: 'default', template: 'home-template'})
  })


module.exports = router