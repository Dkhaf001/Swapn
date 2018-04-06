export const addFollowingHelper = () => `
   INSERT INTO followings (user_id, following_id)
   VALUES ($1, $2)
   RETURNING id, user_id, following_id
  `;

export const fetchAllFollowingHelper = () => `
   SELECT u.id, u.username, u.photo_url from users AS u 
   INNER JOIN followings AS f on (u.id=f.following_id)
   WHERE f.user_id=$1
  `;

export const fetchFollowingHelper = () => `
   SELECT * 
   FROM followings
   WHERE user_id=$1 AND following_id=$2
  `;

export const removeFollowingHelper = () => `
  DELETE FROM followings
  WHERE user_id=$1 AND following_id=$2
  RETURNING id, user_id, following_id
  `;
