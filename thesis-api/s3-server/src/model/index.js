let multer = require('multer'),
  multerS3 = require('multer-s3');

import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';

// loading S3 Api Key
AWS.config.loadFromPath(`${__dirname}/../../../../../configS3.json `);

// Starting S3
const s3 = new AWS.S3();

// List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
// do i need this? to see all buckets of post?
export const listBucket = (cb) => {
  // Call S3 to list current buckets
  s3.listBuckets((err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Bucket List', data.Buckets);
      cb(data);
    }
  });
};

// list stuff in the bucket like albums
// takes in bucketname from user
export const listBucketObjects = (bucketName, cb) => {
  const bucketParams = { Bucket: bucketName };
  s3.listObjects(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });
};

// Create bucket. Note: bucket name must be unique. can be post id
// Requires only bucketName to be passed
export const createBucket = (bucketName, cb) => {
  const bucketParams = { Bucket: bucketName };
  s3.createBucket(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Location);
      cb(data);
    }
  });
};

// takes in bucketname and file bucket  from user
// name could be post id
export const uploadFile = (bucketName, file, cb) => {
  const uploadParams = {
    Bucket: bucketName, // can be post id
    Key: '',
    Body: '',
    ACL: 'public-read',
  };
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', (err) => {
    console.log('File Error', err);
  });
  // sets body = file data
  uploadParams.Body = fileStream;
  // sets key = file name
  uploadParams.Key = path.basename(file);

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      cb(data);
    }
  });
};

// Delete bucket.
// Require bucketName passed
export const deleteBucket = (bucketName, cb) => {
  const bucketParams = { Bucket: bucketName };
  s3.deleteBucket(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
      cb(data);
    }
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
