import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';

AWS.config.loadFromPath(path.resolve(__dirname, '../../../../configS3.json'));

// Starting S3
const s3 = new AWS.S3();
const bucket = 'barterbruh';

export const fetchBucketAlbumQuery = (payload) => {
  const prefix = `${payload.post_id}/`;
  s3.listObjects({ Bucket: bucket, Prefix: prefix }, (err, data) => {
    if (err) {
      console.log('There was an error deleting your album: ', err.message);
    }
    return data;
  });
};

export const removeBucketAlbumQuery = (payload) => {
  // remove all file from album also removing album from s3
  // gets all files from bucket
  const prefix = `${payload.post_id}/`;
  s3.listObjects({ Bucket: bucket, Prefix: prefix }, (err, data) => {
    if (err) {
      console.log('There was an error deleting your album: ', err.message);
    }
    // maps through album
    const objects = data.Contents.map(object => ({ Key: object.Key }));
    const params = { Bucket: bucket };
    params.Delete = { Objects: objects, Quiet: true };
    s3.deleteObjects(params, (err, data) => {
      if (err) {
        console.log('There was an error deleting your album: ', err.message);
      }
      return 'Successfully deleted album.';
    });
  });
};

// takes in bucketname and file bucket  from user
// name could be post id
export const addBucketObjectQuery = async (payload) => {
  const uploadParams = {
    Bucket: bucket, // can be post id
    Key: '',
    Body: '',
    ACL: 'public-read',
  };
  const albumName = payload.album;

  uploadParams.Body = payload.file.data;

  uploadParams.Key = path.join(`${albumName}`, path.basename(payload.file.name));
  console.log('KEY', uploadParams.Key); // 1/Clumsy_Smurf.jpg

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      // sending back upload data so it can be used to render
      return data;
    }
  });
};

// delete object in bucket
export const removeBucketObjectsQuery = (payload) => {
  // key name has album name and file name insereted from controller
  const key = `${payload.post_id}/${payload.key}`;
  const object = { Key: key };
  const params = { Bucket: bucket };
  params.Delete = { Objects: [object], Quiet: true };
  s3.deleteObjects(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
      return data;
    }
  });
};

// dont need below functions
//------------------------------------------------

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
