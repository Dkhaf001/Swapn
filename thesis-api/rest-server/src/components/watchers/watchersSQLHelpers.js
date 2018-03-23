export const addWatchesHelper = ({ user_id, post_id }) => {
  return `
  INSERT INTO watchs (user_id, post_id)
  VALUES (${user_id}, ${post_id})
  RETURNING *
  `;
};

export const removeWatchesHelper = ({ user_id, post_id }) => {
  return `
  DELETE FROM watchs
  WHERE post_id=${post_id} AND user_id=${user_id}
  `;
};

export const fetchAllWatchesHelper = ({ user_id }) => {
  return `
  SELECT * 
  FROM posts 
  INNER JOIN watchs
  ON posts.id = watchs.post_id 
  WHERE watchs.user_id=${user_id}
  `;
};

export const fetchSingleWatchesHelper = ({ user_id, post_id }) => {
  return `
  SELECT * 
  FROM posts 
  INNER JOIN watchs
  ON posts.id = watchs.post_id 
  WHERE watchs.user_id=${user_id} AND watchs.post_id=${post_id}
  `;
};
