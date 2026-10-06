import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import 'dotenv/config'

import {commentCreateValidation, loginValidation, postCreateValidation, registerValidation} from './validations.js'

import { CommentController, UserController, PostController } from "./controllers/index.js"
import {handleValidationErrors, checkAuth} from "./utils/index.js"
  
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 4444;
const uploadsDir = path.resolve('uploads')

mkdirSync(uploadsDir, { recursive: true })

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
   cb(null, uploadsDir)
  },
 filename: (_, file, cb) => {
     const ext = file.originalname.split('.').pop();
     const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
     cb(null, safeName);
 }
})

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(uploadsDir))

app.post('/auth/login', loginValidation,  handleValidationErrors,  UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
 res.json({
  url: `/uploads/${req.file.filename}`,
 })
})

app.get('/posts', PostController.getAll)
app.get('/comments', CommentController.getAll)
app.get('/tags', PostController.getLastTags)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id/comments', CommentController.getForPost)
app.post('/posts/:id/comments', checkAuth, commentCreateValidation, handleValidationErrors, CommentController.create)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete( '/posts/:id', checkAuth, PostController.remove)
app.patch( '/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.listen(PORT, (err) => {
 if (err) return console.log(err)

 console.log('Server OK')
})