const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.engine('hbs',exphbs({defaultLayout:'main', extname: '.hbs'}))
app.set('view engine' , 'hbs')

require('./config/mongodb')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

const routes = require('./routes')
app.use(routes)

app.listen(port , ()=>{
    console.log(`已經連線到http://localhost:${port}`)
})
