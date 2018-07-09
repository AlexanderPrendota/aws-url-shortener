const AWS = require('aws-sdk');
const shortid = require('shortid');

const s3 = new AWS.S3();

s3.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    bucket: "NAME"
});

exports.handler = (event, context, callback) => {
    getShortenLink(event.url, callback)
};

function getShortenLink(url, callback) {
    let key = shortid.generate();
    let params = {
        Bucket: "NAME",
        Key: key
    };
    return s3.getObject(params).promise()
        .then(() => { getShortenLink(url, callback) })
        .catch(() => { getShort(key, params, url, callback) })
}

function getShort(key, params, url, callback) {
    params.ACL = "public-read";
    params.WebsiteRedirectLocation = url;

    return s3.putObject(params).promise()
        .then(() => callback(null, key))
        .catch(err => console.log(err))
}
