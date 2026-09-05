import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

import { registerValidation } from './validations/auth.js'

import UserModel from './models/User.js'
import User from "./models/User.js";

mongoose.connect('mongodb+srv://alinakoman962_db_user:qwerty123@cluster0.tqz0nej.mongodb.net/blog?appName=Cluster0')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const app = express()

app.use(express.json())

app.post('/auth/login', async(req, res) => {
  try {
   const user = await UserModel.findOne({email: req.body.email})

   if (!user) {
    return res.status(400).json({
     message: 'Користувача не знайдено'
    })
    }

   const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

   if (!isValidPass) {
    return res.status(400).json({
     message: 'Не вірний логін або пароль'
    })
   }

   const token = jwt.sign(
       {
        _id: user._id
       },
       'secret123',
       {
        expiresIn: '30d'
       }
   )

   const {passwordHash, ...useData} = user._doc

   res.json({
    ...useData,
    token
   })
  } catch (error) {
   console.log(error)
   res.status(500).json({
    message: 'Не вдалось авторизуватись'
   })
  }
})

app.post('/auth/register', registerValidation, async (req, res) => {
 try {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
   return res.status(400).json(errors.array())
  }

  const password = req.body.password
  const salt = await bcrypt. genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const doc = new UserModel({
   email: req.body.email,
   fullName: req.body.fullName,
   avatarUrl: req.body.avatarUrl,
   passwordHash: hash,
  })

  const user = await doc.save()

  const token = jwt.sign(
      {
        _id: user._id
      },
      'secret123',
      {
       expiresIn: '30d'
      }
  )

  const {passwordHash, ...useData} = user._doc

  res.json({
   ...useData,
   token
  })
 } catch (error) {
   console.log(error)
   res.status(500).json({
    message: 'Не вдалось зареєструватись'
   })
 }
})

app.listen(4444, (err) => {
 if (err) return console.log(err)

 console.log('Server OK')
})