const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://emmabarros91:433080ee@cluster0.msz9f.mongodb.net/test'

// conexion a mongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('database connected')
  }).catch(err => {
    console.error(err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
