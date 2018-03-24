export const fetchAllPostsHelper = () => {
  return `
  SELECT posts.id, posts.title, posts.description, posts.condition, posts.location, posts.demand, posts.user_id, posts.status, posts.main_photo, users.username FROM posts
  INNER JOIN users on (posts.user_id=users.id)
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
  FROM posts AS p
  INNER JOIN users AS u on (p.user_id=u.id) WHERE p.id=${post_id}
  `;
};

export const addPostsHelper = (
  { user_id },
  { title, description, condition, location, demand, status, main_photo }
) => {
  return `
   INSERT INTO posts (title, description, condition, location, demand, user_id, status, main_photo)
   VALUES ('${title}', '${description}', '${condition}', '${location}', '${demand}', ${user_id}, '${status}', '${main_photo}')
   RETURNING *
  `;
};

export const deletePostsHelper = ({ user_id }, { post_id }) => {
  return `
    DELETE FROM posts
    WHERE id=${post_id} AND user_id=${user_id}
  `;
};

export const updatePostsHelper = (
  { user_id, post_id },
  { title, description, condition, location, demand, status, main_photo }
) => {
  return `
   UPDATE posts 
   SET  title='${title}', 
        description='${description}', 
        condition='${condition}', 
        location='${location}', 
        demand='${demand}', 
        status='${status}',
        user_id=${user_id},
        main_photo='${main_photo}'
   WHERE id=${post_id}
   RETURNING *
  `;
};
