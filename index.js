

//importing node framework
const express = require('express')
const cors = require('cors')

const multer = require('multer')
const upload = multer({ dest : 'uploads/' })

const { uploadFile, getSignedS3Url } = require('./s3')


const app = express()
app.use(cors())


app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)

  try{
    await uploadFile(file)
    const signedUrl = getSignedS3Url({
      key: file.filename,
      expires: 1800, // NOTE: Make this URL expire in five seconds.
    });
    console.log(signedUrl);

  }catch(error){
    console.log(`error = ${error}`)
  }

  const description = req.body.description
  res.send('completed.')
})

//listen to port 3000 by default
app.listen(process.env.PORT || 3000)

module.exports = app