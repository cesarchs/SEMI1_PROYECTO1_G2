import 'dotenv/config' 
let aws_keys = {
    s3: {
        region: 'us-east-1',
        accessKeyId: process.env.S3_ACCKEY ,
        secretAccessKey: process.env.S3_ACCKEY,
        //apiVersion: '2006-03-01',
    }
}
export default aws_keys