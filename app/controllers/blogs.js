'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Blog = models.blog;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Blog.find()
    .then(blogs => res.json({
      blogs: blogs.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    blog: req.blog.toJSON({ virtuals: true, user: req.user }),
  });
};

// const create = (req, res, next) => {
//   let blog = Object.assign(req.body.blog, {
//     _owner: req.user._id,
//   });
//   Blog.create(blog)
//     .then(blog =>
//       res.status(201)
//         .json({
//           blog: blog.toJSON({ virtuals: true, user: req.user }),
//         }))
//     .catch(next);
// };
//
// const update = (req, res, next) => {
//   delete req.body._owner;  // disallow owner reassignment.
//   req.blog.update(req.body.blog)
//     .then(() => res.sendStatus(204))
//     .catch(next);
// };
//
// const destroy = (req, res, next) => {
//   req.blog.remove()
//     .then(() => res.sendStatus(204))
//     .catch(next);
// };

module.exports = controller({
  index,
  show,
  // create,
  // update,
  // destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Blog), only: ['show'] },
  { method: setModel(Blog, { forUser: true }), only: ['update', 'destroy'] },
], });
