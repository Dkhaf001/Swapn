const s3 = new AWS.S3();
s3.getObject({ Bucket: 'bucketName', Key: 'keyName' });

s3.listBuckets
  .on('success', (response) => {
    console.log(response.data);
  })
  .send();

// return response{ Owne
s3.config.credentials.accessKeyId = 'invalid';
s3
  .listBuckets()
  .on('error', (error, response) => {
    console.log(error);
  })
  .send();
request
  .on('complete', (response) => {
    if (response.error) {
      // an error occurred, handle it
    } else {
      // we can use response.data here
    }
  })
  .send();
s3
  .listObjects({ Bucket: 'bucket' })
  .on('success', function handlePage(response) {
    // do something with response.data
    if (response.hasNextPage()) {
      response
        .nextPage()
        .on('success', handlePage)
        .send();
    }
  })
  .send();
