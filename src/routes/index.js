const { Router } = require('express')
const router = Router()

const Photo = require('../models/Photo')
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const fs = require('fs-extra')

router.get('/', async (req, res) => {
  const photos = await Photo.find().lean()
  res.render('partials/images', { photos })
})

router.get('/images/add', async (req, res) => {
  const photos = await Photo.find().lean()
  res.render('partials/image_form', { photos })
})

router.post('/images/add', async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  console.log(result)
  const { title, description } = req.body
  const newPhoto = new Photo({
    title,
    description,
    imageURL: result.url,
    public_id: result.public_id,
  })
  await newPhoto.save()
  await fs.unlink(req.file.path)
  res.redirect('/')
})

router.get('/images/delete/:photo_id', async (req, res) => {
  const { photo_id } = req.params
  const photo = await Photo.findByIdAndDelete(photo_id)
  const result = await cloudinary.v2.uploader.destroy(photo.public_id)
  console.log(result)
  res.redirect('/images/add')
})

module.exports = router
