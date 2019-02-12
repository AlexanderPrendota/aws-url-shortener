[![Version](https://img.shields.io/badge/version-v0.0.1-green.svg)](https://github.com/AlexanderPrendota/aws-url-shortener/releases)

# URL Shortener

Сurrent version: 0.0.1 :tada:

### Environment:

| ENV                | Description                             | 
| -------------------|-----------------------------------------| 
| AWS_KEY            | AWS Credential                          | 
| AWS_SECRET         | AWS Credential                          |  
| REDIRECT_HOST_NAME | Static web-site host name from S3 bucket|    
| BUCKET_NAME        | Amazon S3 bucket name                   |    

### Example

<img width="1198" alt="screen shot 2018-08-22 at 5 12 35 pm" src="https://user-images.githubusercontent.com/10503748/44468757-9eef7600-a62e-11e8-9fc8-715dbdd2b948.png">

# How to use

From `Java-Script`:

```js
const URL = 'URL_TO_SHORTNER';

function generateShortUrl(longUrl) {
  return fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: longUrl })
  }).then(data => data.json());
}


```


