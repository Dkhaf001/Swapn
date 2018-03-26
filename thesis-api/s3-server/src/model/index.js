import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';

// functions need add remove album  
//add and remove photos
//view album

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html


// loading S3 Api Key

// bug here webpack hell
// https://www.javascriptstuff.com/aws-sdk-with-webpack/
// https://aws.amazon.com/blogs/developer/using-webpack-and-the-aws-sdk-for-javascript-to-create-and-bundle-an-application-part-1/

AWS.config.loadFromPath(`${__dirname}/configS3.json`);

// Starting S3
const s3 = new AWS.S3();


//Four functions
//view album
//add photo
  // check if bucket contains album
    //if not create album
  // add photo to album
//remove album
//remove photo from album

export const fetchBucketAlbumQuery = () => {
  s3.listObjects({Bucket: "barterbruh",Prefix: "test/"}, function(err, data) {
    if (err) {
      console.log('There was an error deleting your album: ', err.message);
    }
    return data;
  })
}

// takes in bucketname and file bucket  from user
// name could be post id
export const addBucketObjectQuery = async (bucketName, filestream) => {
  const uploadParams = {
    Bucket: bucketName, // can be post id
    Key: '',
    Body: '',
    ACL: 'public-read',
  };
  console.log('1!@@@@@@@@', filestream.name);
  console.log('------------filestream---------', filestream);
  const test = path.basename(filestream.name);
  // const fileStream = fs.createReadStream(file);
  // fileStream.on('error', (err) => {
  //   console.log('File Error', err);
  // });

  // sets body = file data
  uploadParams.Body = filestream.data;
  // sets key = file name
  //can add album name in controllers
  //test set = to post id so that it cretes a folder for a post
  uploadParams.Key = "test/"+ path.basename(filestream.name);
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      //sending back upload data so it can be used to render
      return data;
    }
  });
};

export const removeBucketAlbumQuery = () => {
//remove all file from album also removing album from s3
//gets all files from bucket
  s3.listObjects({Bucket: "barterbruh",Prefix: "test/"}, function(err, data) {
    if (err) {
      console.log('There was an error deleting your album: ', err.message);
    }
    //maps through album 
    var objects = data.Contents.map(function(object) {
      return {Key: object.Key};
    });
    const params = {Bucket: "barterbruh"}
    params.Delete = {Objects: objects, Quiet: true}
    s3.deleteObjects( params, function(err, data) {
      if (err) {
        console.log('There was an error deleting your album: ', err.message);
      }
      console.log('Successfully deleted album.');
      
    });
  });
}

// delete object in bucket
export const removeBucketObjectsQuery = (bucketName, keyName, cb) => {
  //key name has album name and file name insereted from controller
  const bucketParams = { Bucket: bucketName, Key: keyName };
  s3.deleteObjects(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
      return data;
    }
  });
};




//dont need below functions
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

