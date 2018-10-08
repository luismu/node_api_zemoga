const User = require('../model/user.model.js');
const Jwt = require('../utils/jwt.js');


// Create and Save a new User
exports.create = (req, res) => {

    // Create a User
    var user = new User({
        username: req.body.username, 
        password: req.body.password,
        age: req.body.age,
        marriage_status: req.body.marriage_status
    });

    // Save User in the database
    user.save((err) => {
        if (err) return res.status(500).send({ message: `Can't create the user: ${err}` })
    
        return res.status(201).send({ 
            message:"User registered",
            token: Jwt.createToken(user) 
        })
      })

    
};

// Sign in the user
exports.signIn = (res, req) => {
    User.find({
        username: req.body.username,
        password: req.body.password
    }, (err, user)=>{
        if(err) return res.status(500).send({ message: err })
        if(!user) return res.status(404).send({ message: "the user doesn't exists" })

        req.user = user
        res.status(200).send({
            message: "You are loggin",
            token: Jwt.createToken(user)
        })
    });

}

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, 
        req.body, 
        {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

