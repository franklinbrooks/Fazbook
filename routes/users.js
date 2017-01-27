var express = require('express');
var router = express.Router();
var models = require('../server/models/index'); // import sequelizer

/* GET users listing. */
router.get('/', function(req, res, next) {  // main route
  models.User.findAll({}).then(function(users){
    res.render('users/index', {
      title: 'All fazbook users',
      users: users
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('users/new', {
    title: 'Create New Fazbook User'
  });
});

router.post('/', function(req, res, next) {  // creates new user in db
  models.User.create({
    firstName: req.body.firstName,  // ask where body is referenced
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(function() {
    res.redirect('/users')
  });
});

router.delete('/:id', function(req, res, next) {  // destroy processed by methodOverride
  models.User.destroy({
    where: { id: req.params.id }
  }).then(function(user) {
    res.redirect('/users');
  });
});

router.get('/:id', function(req, res, next) { // id from db
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/show', {
      title: 'Fazbook User',
      user: user
    });
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {  // sequelizer method: findById
    res.render('users/edit', {
      title: 'Edit Fazbook User',
      user: user
    });
  });
});

router.put('/:id', function(req, res, next) {
  models.User.update({ // more sequelizer
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/users/' + req.params.id);
  });
});

module.exports = router;
