import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://alinakoman962_db_user:qwerty123@cluster0.tqz0nej.mongodb.net/?appName=Cluster0')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World cccc')
})

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    if (req.body.email === 'test@test.ua') {
        const token = jwt.sign({
                email: req.body.email,
                fullName: 'Вася Пупкін'
            },
            'secret123'
        )
    }

    res.json({
        success: true,
        token
    })
})

app.listen(4444, (err) => {
 if (err) return console.log(err)

 console.log('Server OK')
})