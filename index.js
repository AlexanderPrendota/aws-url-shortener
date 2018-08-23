const AWS = require('aws-sdk');
const shortid = require('shortid');
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REDIRECT_HOST_NAME = process.env.REDIRECT_HOST_NAME;
const VALIDATION_ERROR_MESSAGE = 'Long url isn\'t found';
const REQUEST_URL_KEY = 'url';

s3.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    bucket: BUCKET_NAME
});

exports.handler = (event, context, callback) => {
    const data = event.data;
    if (data && data[REQUEST_URL_KEY]) {
        getShortenLink(event.data.url, callback)
    } else {
        fail(callback);
    }
};

function getShortenLink(url, callback) {
    let key = shortid.generate();
    let params = {
        Bucket: BUCKET_NAME,
        Key: key
    };
    return s3.getObject(params).promise()
        .then(() => {
            getShortenLink(url, callback)
        })
        .catch(() => {
            getShort(key, params, url, callback)
        })
}

function getShort(key, params, url, callback) {
    params.ACL = "public-read";
    params.WebsiteRedirectLocation = url;

    return s3.putObject(params).promise()
        .then(() => callback(null, `${REDIRECT_HOST_NAME}/${key}`))
        .catch(err => console.log(err))
}

function fail(callback) {
    callback(VALIDATION_ERROR_MESSAGE, null);
}
