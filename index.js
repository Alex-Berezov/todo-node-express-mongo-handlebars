const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) //'hbs' - can has any name
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://aleber:farizda90@cluster0.jxk06.mongodb.net/todos',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        )
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()