let multer = require('multer'),
  multerS3 = require('multer-s3'),
  fs = require('fs'),
  AWS = require('aws-sdk');

AWS.config.loadFromPath(`${__dirname}/../../../../../configS3.json`);
console.log('in host');

const s3 = new AWS.S3();

// Create bucket. Note: bucket name must be unique.
// Requires only bucketName to be passed
exports.createBucket = function (bucketName, cb) {
  const params = { Bucket: bucketName };
  s3.createBucket(params, (err, data) => {
    if (err) {
      console.log('error create s3', err);
    }
    cb(data);
  });
};

// List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
exports.listBuckets = function (cb) {
  s3.listBuckets({}, (err, data) => {
    if (err) {
      console.log('error list s3', err);
    }
    cb(data);
  });
};

// Delete bucket.
// Require bucketName passed
exports.deleteBucket = function (bucketName, cb) {
  const params = { Bucket: bucketName };
  s3.deleteBucket(params, (err, data) => {
    if (err) {
      console.log('error delete s3', err);
    }
    cb(data);
  });
};

// Retrieves all pictures from a single bucket in Amazon s3
exports.getObjects = function (bucketName, cb) {
  const params = { Bucket: bucketName };
  s3.listObjects(params, (err, data) => {
    if (err) {
      console.log(`error listAll in bucket: ${bucketName}`, err);
    }
    cb(data); // array of objects
  });
};

// Delete an object
exports.deleteObject = function (bucketName, keyName, cb) {
  const params = { Bucket: bucketName, Key: keyName };
  s3.deleteObjects(params, (err, data) => {
    if (err) {
      console.log(`error deleting key: ${keyName} in bucket: ${bucketName}`, err);
    }
    cb(data);
  });
};

// Pass the bucket name and file given from user
// Username , file with buffer and a cb
exports.uploadFile = function (user, file, cb) {
  s3.upload(
    {
      Bucket: user,
      Key: file.name,
      Body: file.data,
      ACL: 'public-read',
    },
    (data) => {
      console.log('Successfully uploaded package.');
      cb(data);
    },
  );
};
