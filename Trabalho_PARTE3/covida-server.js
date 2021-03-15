'use strict'

const express = require('express')
const app = express()
const expressSession = require('express-session')
const passport = require('passport')

const port = 8080

const router = require('./router.js')()

app.use(expressSession({
    secret: 'Keyboards',
    resave: false,
    saveUninitialized: true
}))

//Authentication
app.use(passport.initialize())
app.use(passport.session())

app.use(router) //Pedidos 

app.set('views', 'app/views') //Permite ao render olhar para os ficheiros em views numa diretoria que nao a do projeto
app.set('view engine', 'hbs') //Permite adicionar .hbs em render
//app.use(express.static('app/images'))



app.listen(port, () => console.log(`Listening on ${port}`))