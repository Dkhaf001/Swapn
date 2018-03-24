// this stuff is how we send datat to server

// data from in controller to add photo to db
const host = require('./../service/s3');

module.exports = {
  addPhoto: (input, callback) => {
    console.log('name:', input.body.displayname);
    console.log('description:', input.body.description);
    console.log('file:', input.files.file);

    // New Bucket Creation MVP+
    // host.createBucket("helooeoloeeee", (data) => {console.log("i did it", data)} )

    bucket = 'helooeoloeeee'; // testing bucket for MVP
    host.uploadFile('helooeoloeeee', input.files.file, (data) => {
      console.log('From AWS', data);
      // `https://${input.files.file.name}.s3.amazonaws.com/${input.files.file.name}`  ---> URL FORM

      const newPhoto = new Photo({
        username: input.params.username, // email
        displayname: input.body.displayname,
        description: input.body.description,
        photoUrl: `https://${bucket}.s3.amazonaws.com/${input.files.file.name}`,
        likes: [],
      });
      newPhoto.save(callback());
    });
  },
};
