import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import checkAuth from "./utils/checkAuth.js"

import { register, login, getMe } from "./controllers/UserController.js"
import * as PostController from "./controllers/PostControllers.js"


mongoose.connect('mongodb+srv://alinakoman962_db_user:qwerty123@cluster0.tqz0nej.mongodb.net/blog?appName=Cluster0')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
   cb(null, 'uploads')
  },
 filename: (_, file, cb) => {
   cb(null, file.originalname)
 }
})

const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation,  login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth, getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
 res.json({
  url: `/uploads/${req.file.originalname}`,
 })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation,  PostController.create)
app.delete( '/posts/:id', checkAuth, PostController.remove)
app.patch( '/posts/:id', checkAuth, PostController.update)

app.listen(4444, (err) => {
 if (err) return console.log(err)

 console.log('Server OK')
})