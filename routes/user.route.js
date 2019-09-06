var express = require('express');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleWare = require('../middleware/auth.middleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/cookie', function(req, res, next){
    res.cookie('cookie-id', 1234);
    res.send('Hello');
});

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;