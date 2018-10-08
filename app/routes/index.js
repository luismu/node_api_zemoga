    'use-strict'
    
    const express = require('express')
    const auth = require('../middlewares/auth')
    const userCtrl = require('../controller/user.controller.js');
    const api = express.Router()

    // Create a new User
    api.post('/signup', userCtrl.create);

    // Sign in a user
    api.post('/signin', userCtrl.signIn);

    // Retrieve all Users
    api.get('/users', userCtrl.findAll);

    // Retrieve a single User with userId
    api.get('/users/:userId', auth, userCtrl.findOne);

    // Update a User with userId
    api.put('/users/:userId', auth, userCtrl.update);

    // Delete a User with userId
    api.delete('/users/:userId', auth, userCtrl.delete);

    //Check the authorize module.
    api.get('/private', auth, function(req, res){
        res.status(200).send({ message: 'Authorize' })
    })

module.exports = api