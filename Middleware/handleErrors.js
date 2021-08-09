module.exports = (error, req, res, next) => {
  console.error(error)
  console.log(error.name)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'id is not correct' })
  } else {
    res.status(500).end()
  }
}
