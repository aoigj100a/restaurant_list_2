const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs',exphbs({defaultLayout:'main', extname: '.hbs'}))
app.set('view engine' , 'hbs')

app.use(express.static('public'))

const routes = require('./routes')
app.use(routes)



app.listen(port , ()=>{
    console.log(`已經連線到http://localhost:${port}`)
})
