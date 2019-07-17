'use strict';

const mongoose = require('mongoose')

const urlsSchema = new mongoose.Schema({
  id: Number,
  shortUrl: String,
  longUrl: String
});

urlsSchema.index({id: 1});

const Urls = mongoose.model('Urls', urlsSchema);

module.exports = Urls; 