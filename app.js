const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')

const app = express()
const port = 3000

app.engine('hbs',exphbs({defaultLayout:'main', extname: '.hbs'}))
app.set('view engine' , 'hbs')

require('./config/mongodb')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// 設定session
// process.env.SESSION_SECRET,
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  }))


usePassport(app)

app.use(routes)

app.listen(port , ()=>{
    console.log(`已經連線到http://localhost:${port}`)
})
