const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const messageModel = require('../models/message')
const imageModel = require('../models/image')
const fs = require('fs')
const path = require('path')
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + new Date().toISOString().replace)
  }
});

const upload = multer({ storage: storage });
const db = mongoose.connection;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const messages = await messageModel.find({})
  const images = await imageModel.find({})
  let result = [...images, ...messages].sort((a, b) => {
    if(a.date > b.date){
      return -1
    }
    else if(b.date > a.date) {
      return 1
    }
    return 0
  })
  res.render('index', { messages: result });
});
/* GET new message page. */
router.get('/new', function(req, res, next) {
  res.render('form');
});
/* POST new message. */
router.post('/new', function(req, res, next) {
  messageModel.create({
    nickname: req.body.username,
    message: req.body.message,
    date: new Date()
  })
  res.redirect('/')
})
/* POST new image. */
router.post('/newimg', upload.single('image'), function(req, res, next) {
  imageModel.create({
    nickname: req.body.username,
    image: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: req.file.mimetype
    },
    date: new Date()
  })
  res.redirect('/')
})

module.exports = router;
