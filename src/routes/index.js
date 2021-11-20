const {Router} = require('express')
const router = Router()

const Photo = require('../models/Photo')

router.get('/', (req, res) => {
	res.render('partials/images')
})

router.get('/images/add', (req, res) => {
	res.render('partials/image_form')
})

router.post('/images/add', (req, res) => {
	console.log(req.body);
	console.log(req.file);
	const { title, description } = req.body
	new Photo({
		title,
		description,
		imageURL,
		public_id
	})
	res.send('Received')
})


module.exports = router