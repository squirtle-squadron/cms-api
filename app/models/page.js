'use strict';

const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  footer: {
    type: String,
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

// pageSchema.virtual('length').get(function length() {
//   return this.text.length;
// });

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
