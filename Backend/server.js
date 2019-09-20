const express = require('express');
const app = express();
const PATH = require('path');
const session = require("express-session")
const cookie_parser = require('cookie-parser')
const distPath = PATH.join(__dirname, '../dist');
const dotenv = require('dotenv');
const seed = require('./seed');
const { User, hashPassword } = require('./models/User')

dotenv.config();

if(process.env.SEED) {
  seed()
}

app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static(distPath));
app.use('/api', require('./routes/index'));

app.get('/', (req, res, next) => {
  res.sendFile(PATH.join(__dirname, '../index.html'));
});

app.get('/login', async (req, res, next) => {
  try{
    if (req.session.userId) {
      const user = await User.findOne({
        where: {
          id: req.session.userId
        },
        attributes: ['id', 'fullName']
      })
      res.send(user);
    }
    else{
      res.redirect('/');
    }
  }
  catch (ex){
    next(ex);
  }
});

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const loginUser = await User.findOne({
        where: {
          email
        }
      });
      if (loginUser) {
        if (loginUser.password === hashPassword(password)) {
          req.session.userId = loginUser.id;
          res.status(201).send(req.session.userId);
          console.log(req.session)
        } else {
          res.status(203).send('Unauthorized: Wrong Password');
        }
      } else {
        res.status(203).send('Unautorized: Please create an Account');
      }
    } else {
      res.status(203).send('Unauthorized: Enter your Credentials');
    }
  } catch (ex) {
    next(ex);
  }
});

app.delete('/login', async (req, res, next) => {
  try {
    if (req.session.userId) {
      delete req.session.userId;
      res.sendStatus(204);
    } else {
      console.log('this should never appear, check code in app.delete route');
    }
  } catch (ex) {
    next(ex);
  }

});

//jest testing route
// app.get('/serverTesting', (req, res) => res.send('sucessful'));

module.exports = app;
