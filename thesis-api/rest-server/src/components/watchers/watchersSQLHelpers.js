export const addWatchesHelper = () => `
  INSERT INTO watchs (user_id, post_id)
  VALUES ($1, $2)
  RETURNING *
  `;

export const removeWatchesHelper = () => `
  DELETE FROM watchs
  WHERE post_id=$2 AND user_id=$1
  `;

export const fetchAllWatchesHelper = () => `
  SELECT * 
  FROM watchs 
  INNER JOIN posts
  ON posts.id = watchs.post_id 
  WHERE watchs.user_id=$1
  `;

export const fetchSingleWatchesHelper = () => `
  SELECT * 
  FROM watchs 
  INNER JOIN posts
  ON posts.id = watchs.post_id 
  WHERE watchs.user_id=$1 AND watchs.post_id=$2
  `;
