const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const exphbs = require('express-handlebars')

// initializations
const app = express()

// settings
app.set('port', 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
	defaultLayout: 'main', 
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}))
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/uploads'),
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + path.extname(file.originalname));
	}
})
app.use(multer({storage}).single('image'))

// Routes
app.use(require('./routes'))

module.exports = app

