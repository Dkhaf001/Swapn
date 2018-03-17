export const fetchAllPostsHelper = () => {
  return `
  SELECT * 
  FROM posts 
  `;
};

export const fetchUserPostsHelper = ({ user_id }) => {
  return `
  SELECT * 
  FROM posts 
  WHERE user_id = ${user_id}
  `;
};

export const fetchSinglePostsHelper = ({ user_id, post_id }) => {
  return `
  SELECT * 
  FROM posts 
  WHERE user_id = ${user_id} AND id = ${post_id}
  `;
};

export const addPostsHelper = (
  { user_id },
  { title, description, condition, location, demand, status }
) => {
  return `
   INSERT INTO posts (title, description, condition, location, demand, user_id, status)
   VALUES ('${title}', '${description}', '${condition}', '${location}', '${demand}', ${user_id}, '${status}')
   RETURNING *
  `;
};

export const updatePostsHelper = (
  { user_id, post_id },
  { title, description, condition, location, demand, status }
) => {
  return `
   UPDATE posts 
   SET  title='${title}', 
        description='${description}', 
        condition='${condition}', 
        location='${location}', 
        demand='${demand}', 
        status='${status}',
        user_id=${user_id} 
   WHERE id=${post_id}
   RETURNING *
  `;
};
