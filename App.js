require('./mongo.js')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const Letra = require('./models/Letra')
const notFound = require('./Middleware/notFound')
const handleErrors = require('./Middleware/handleErrors')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())

app.use(logger)

app.get('/', (req, res) => {
  res.send('<h1>Eventos<h1/>')
})

app.get('/api/letras', (req, res) => {
  Letra.find({}).then(letras => {
    res.json(letras)
  })
})

app.get('/api/letras/:id', (req, res, next) => {
  const { id } = req.params.id

  Letra.findById(id).then(letra => {
    if (letra) {
      return res.json(letra)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/api/letras/:id', (req, res, next) => {
  const { id } = req.params
  const letra = req.body

  const newLetraInfo = {
    titulo: letra.titulo,
    descripcion: letra.descripcion,
    destacado: letra.destacado || false,
    lugar: letra.lugar,
    date: new Date()
  }

  Letra.findByIdAndUpdate(id, newLetraInfo, { new: true }).then(result => {
    res.json(result)
  }).catch(error => next(error))
  res.status(204).end()
})

app.delete('/api/letras/:id', (req, res, next) => {
  const { id } = req.params
  Letra.findByIdAndDelete(id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
  res.status(204).end()
})

app.post('/api/letras', (req, res) => {
  const letra = req.body

  if (!letra || !letra.titulo) {
    return res.status(400).json({
      error: 'letra.titulo is missing'
    })
  }

  const newLetra = new Letra({
    titulo: letra.titulo,
    descripcion: letra.descripcion,
    destacado: letra.destacado || false,
    lugar: letra.lugar,
    date: new Date()
  })

  newLetra.save().then(savedLetra => {
    res.json(savedLetra)
  })
})

app.use('/api/users', usersRouter)

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
