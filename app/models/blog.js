'use strict';

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  content:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1005
  },
  author:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
