export const fetchAllPhotosHelper = () => `
  SELECT * 
  FROM photos 
  WHERE photos.post_id=$1
  `;

export const addPhotosHelper = () => `
  INSERT INTO photos (post_id, url)
  VALUES ($1, $2)
  RETURNING id, post_id, url
  `;

export const removePhotosHelper = () => `
  DELETE FROM photos
  WHERE photos.post_id=$1 AND id=$2
  `;

export const removeAllPhotosHelper = () => `
  DELETE FROM photos
  WHERE post_id=$1 
  `;

//   export const fetchAllPhotosHelper = ({ post_id }) => `
//   SELECT *
//   FROM photos
//   WHERE photos.post_id=${post_id}
//   `;

// export const addPhotosHelper = ({ post_id }, url) => `
//   INSERT INTO photos (post_id, url)
//   VALUES (${post_id}, '${url}')
//   RETURNING id, post_id, url
//   `;

// export const removePhotosHelper = ({ post_id, photo_id }) => `
//   DELETE FROM photos
//   WHERE photos.post_id=${post_id} AND id=${photo_id}
//   `;

// export const removeAllPhotosHelper = ({ post_id }) => `
//   DELETE FROM photos
//   WHERE post_id=${post_id}
//   `;
