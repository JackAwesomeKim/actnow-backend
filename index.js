

//importing node framework
const express = require('express')
const cors = require('cors')

const multer = require('multer')
const upload = multer({ dest : 'uploads/' })

const { uploadFile } = require('./s3')

const app = express()
app.use(cors())


app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)
  await uploadFile(file)
  const description = req.body.description
  res.send('completed.')
})

//listen to port 3000 by default
app.listen(process.env.PORT || 3000)

module.exports = app