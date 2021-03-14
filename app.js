const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

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
  app.use(flash())  // 掛載套件
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
  })

app.use((req, res, next) => {
    console.log(req.user)
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
  })

app.use(routes)

app.listen(port , ()=>{
    console.log(`已經連線到http://localhost:${port}`)
})
