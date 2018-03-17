export const addWatchesHelper = ({ user_id, post_id }) => {
  return `
  INSERT INTO watchs (user_id, post_id)
  VALUES (${user_id}, ${following_id})
  RETURNING id, user_id, post_id
  `;
};

export const removeWatchesController = ({ user_id, post_id }) => {
  return `
  DELETE FROM watchs
  WHERE post_id=${post_id} AND user_id=${user_id}
  `;
};

export const fetchAllWatchesController = ({ user_id }) => {
  return `
  SELECT * 
  FROM posts 
  INNER JOIN watchs
  ON posts.id = watchs.post_id 
  WHERE watchs.user_id=${user_id}
  `;
};
