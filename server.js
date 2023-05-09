const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1234',
    database : 'smart-brain'
  }
});

// Connecting to Smart-Brain Database
// Run the command psql -U postgres
// Run the command \c smart-brain

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => { res.send(db.users) })

// -------------------------------------------------------
// SIGN IN ENDPOINT

app.post('/signin', signin.handleSignIn(db, bcrypt))

// -------------------------------------------------------
// REGISTER ENDPOINT

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// -------------------------------------------------------
// PROFILE ENDPOINT

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

// -------------------------------------------------------
// IMAGE ENDPOINT

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// -------------------------------------------------------


app.listen(process.env.PORT || 3000, () => {
  console.log('App is running on port ${process.env.PORT}');
})




/* Server Blueprint

/ 				 --> res = this is working
/signin 		 --> POST = success/fail
/register 		 --> POST = user
/profile/:userId --> GET = user
/image 			 --> PUT = user

*/