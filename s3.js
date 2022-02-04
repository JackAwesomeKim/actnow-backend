require('dotenv').config()

const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accesskeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accesskeyId,
    secretAccessKey
})

//uploads a file to s3
function uploadFile(file){
    console.log(bucketName)
    console.log(region)
    console.log(accesskeyId)
    console.log(secretAccessKey)

    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket : bucketName,
        Body : fileStream,
        Key : file.filename
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

//downloads a file from s3
function download(file){
    
}

function getSignedS3Url ({ key, expires }){
    const signedUrl = s3.getSignedUrl("getObject", {
      Key: key,
      Bucket: bucketName,
      Expires: expires || 900, // S3 default is 900 seconds (15 minutes)
    });
    return signedUrl;
};
exports.getSignedS3Url = getSignedS3Url
