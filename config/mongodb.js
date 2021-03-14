const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// (node:2838) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.done.
mongoose.set('useCreateIndex', true)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})
module.exports = db