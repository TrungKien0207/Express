var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleWare = require('../middleware/auth.middleware');

var upload = multer({ dest: '../public/uploads/' });

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/cookie', function(req, res, next){
    res.cookie('cookie-id', 1234);
    res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', 
    upload.single('avatar'), 
    validate.postCreate, 
    controller.postCreate
);

module.exports = router;