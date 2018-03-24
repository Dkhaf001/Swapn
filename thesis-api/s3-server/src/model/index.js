let multer = require('multer'),
  multerS3 = require('multer-s3');

import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';

// loading S3 Api Key

// bug here
// AWS.config.loadFromPath(`${__dirname}/../../../../../configS3.json`);

// Starting S3
const s3 = new AWS.S3();

// List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
// do i need this? to see all buckets of post?
export const listBucketQuery = (cb) => {
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

// list stuff in the bucket like albums or all photos in that bucket
// takes in bucketname from user
export const listBucketObjectsQuery = (bucketName, cb) => {
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
export const createBucketQuery = (bucketName, cb) => {
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

// Delete bucket.
// Require bucketName passed
export const removeBucketQuery = (bucketName, cb) => {
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

// takes in bucketname and file bucket  from user
// name could be post id
export const addFileQuery = (bucketName, file, cb) => {
  const uploadParams = {
    Bucket: bucketName, // can be post id
    Key: '',
    Body: '',
    ACL: 'public-read',
  };
  console.log('------------file---------', file);
  const fileStream = fs.createReadStream(file.data);
  fileStream.on('error', (err) => {
    console.log('File Error', err);
  });
  // sets body = file data
  // uploadParams.Body = fileStream;
  // sets key = file name
  // uploadParams.Key = path.basename(file);

  // s3.upload(uploadParams, (err, data) => {
  //   if (err) {
  //     console.log('Error', err);
  //   }
  //   if (data) {
  //     console.log('Upload Success', data.Location);
  //     cb(data);
  //   }
  // });
};

// delete object in bucket
export const removeBucketObjectsQuery = (bucketName, keyName, cb) => {
  const bucketParams = { Bucket: bucketName, Key: keyName };
  s3.deleteObjects(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });
};
