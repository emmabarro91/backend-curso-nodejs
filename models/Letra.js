const { Schema, model } = require('mongoose')

const letraSchema = new Schema({
  titulo: String,
  descripcion: String,
  destacado: Boolean,
  lugar: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

letraSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Letra = model('Letra', letraSchema)

module.exports = Letra
