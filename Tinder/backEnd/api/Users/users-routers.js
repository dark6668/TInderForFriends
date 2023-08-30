const express = require('express');
const {Users} = require('./users-controller');
const usersCrudControler = new Users("users");
const router = express.Router();

router.post('/getUsers', usersCrudControler.getAllData.bind(usersCrudControler));


module.exports = router;



