export const addFollowingHelper = ({ user_id, following_id }) => {
  return `
   INSERT INTO followings (user_id, following_id)
   VALUES (${user_id}, ${following_id})
   RETURNING id, user_id, following_id
  `;
};

export const fetchAllFollowingHelper = ({ user_id }) => {
  return `
   SELECT u.id, u.username, u.photo_url from users AS u 
   INNER JOIN followings AS f on (u.id=f.following_id)
   WHERE f.user_id=${user_id}
  `;
};

export const removeFollowingHelper = ({ user_id, following_id }) => {
  return `
  DELETE FROM followings
  WHERE user_id=${user_id} AND following_id=${following_id}
  RETURNING id, user_id, following_id
  `;
};
