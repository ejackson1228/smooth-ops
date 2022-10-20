const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };


//Routes for Modals constant variables

const { User } = require('./models/User');
const { Post } = require('./models/Post');
const { Comment } = require('./models/Comment');
const { Vote } = require('./models/Vote');
const { Pokemon } = require('./models/Pokemon');
//End Modal Vars for Routes

app.use(session(sess));

const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api')




app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});
