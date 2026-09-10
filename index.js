import express from 'express'
import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js'
import checkAuth from "./utils/checkAuth.js"

import { register, login, getMe } from "./controllers/UserController.js"


mongoose.connect('mongodb+srv://alinakoman962_db_user:qwerty123@cluster0.tqz0nej.mongodb.net/blog?appName=Cluster0')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const app = express()

app.use(express.json())

app.post('/auth/login', login)

app.post('/auth/register', registerValidation, register)

app.get('/auth/me', checkAuth, getMe)

app.listen(4444, (err) => {
 if (err) return console.log(err)

 console.log('Server OK')
})