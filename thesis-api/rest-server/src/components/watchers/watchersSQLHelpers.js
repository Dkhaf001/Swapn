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

// export const addWatchesHelper = ({ user_id, post_id }) => `
//   INSERT INTO watchs (user_id, post_id)
//   VALUES (${user_id}, ${post_id})
//   RETURNING *
//   `;

// export const removeWatchesHelper = ({ user_id, post_id }) => `
//   DELETE FROM watchs
//   WHERE post_id=${post_id} AND user_id=${user_id}
//   `;

// export const fetchAllWatchesHelper = ({ user_id }) => `
//   SELECT *
//   FROM watchs
//   INNER JOIN posts
//   ON posts.id = watchs.post_id
//   WHERE watchs.user_id=${user_id}
//   `;

// export const fetchSingleWatchesHelper = ({ user_id, post_id }) => `
//   SELECT *
//   FROM watchs
//   INNER JOIN posts
//   ON posts.id = watchs.post_id
//   WHERE watchs.user_id=${user_id} AND watchs.post_id=${post_id}
//   `;
