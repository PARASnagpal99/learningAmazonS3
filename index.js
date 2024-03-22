const { S3Client, ListBucketsCommand , GetObjectCommand, PutObjectCommand, ListObjectsV2Command , DeleteObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config()


const s3Client = new S3Client({
    region : 'ap-south-1' ,
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    }
})

async function getObject(key){
    const command = new GetObjectCommand({
          Bucket : 'eventifyx',
          Key : key ,
    })
    const url = await getSignedUrl(s3Client,command,{ expiresIn: 20 });
    return url ;
}

async function putObject(fileName , contentType){
     const command = new PutObjectCommand({
        Bucket : 'eventifyx',
        Key : `uploads/user-uploads/${fileName}`,
        ContentType : contentType 
     })
     const url = await getSignedUrl(s3Client,command);
     return url ;
}

async function listObjects(){
      const command = new ListObjectsV2Command({
         Bucket : 'eventifyx',
         Key : '/'
      });
     const res = await s3Client.send(command);
     return res.Contents;
}

async function deleteObject(){
    const command = new DeleteObjectCommand({
        Bucket : 'eventifyx',
        Key : `image-1711064559276.mp4`
    })
    const res = await s3Client.send(command);
    console.log(res);
}

async function init(){
      //console.log(await putObject(`image-${Date.now()}.mp4`,"image/mp4"));
      console.log(await listObjects());
      //console.log(await deleteObject());
}

init();