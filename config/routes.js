const axios = require('axios');
const db = require('./routes-model');
const { authenticate } = require('../auth/authenticate');
const secrets = require('../config/secrets');
//add import for hash 
const bcrypt = require('bcryptjs');
//import json token and secrets file 
const jwt = require('jsonwebtoken');


module.exports = server => {
  server.post('/api/authenticate/register', register);
  server.post('/api/authenticate/login',  login);
  server.get('/api/jokes', authenticate, getJokes);
};

//POST for user registration 
function register(req, res) {
  // implement user registration
  let user = req.body; //user contains plain txt pwd/username
  const hash = bcrypt.hashSync(user.password, 5)
  //overrride user.pwd with hashed pwd 
  user.password = hash;

  db.add(user)
  .then(saved => {
      res.status(201).json(saved)
  })
  .catch(err => {
      res.status(500).json({error: err.message})
  })
}




//POST for user login
function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  db.findBy({ username })
     .first()
     .then(user => {
         //if pwds match....
         if(user && bcrypt.compareSync(password, user.password)) {
             const token = generateToken(user); //add token
             res.status(201).json({ message: `You are logged in as ${user.username}!, please accept this token`, token }); //pass in token 
         } else {
             res.status(401).json({message: 'You shall not pass!' })
         }
     })
     .catch(err => {
         res.status(500).json({ error: err.message})
     })
 }



function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}


const generateToken = user => {
  const payload = {
      subject: user.id, //what token is about 
      username: user.username,
      //other data 
      // department: [''], add later 
  }
  const options = {
      expiresIn: '72h'
  }
  return jwt.sign(payload, secrets.jwtKey, options); 
}


