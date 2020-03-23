const express = require('express')
const router = express.Router()

router.get('/map', function(req, res, next) {
  res.render('tinymap', {layout: 'map', template: 'home-template'})
})


module.exports = router