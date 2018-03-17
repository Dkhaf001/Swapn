export const fetchUserPostsHelper = ({ user_id }) => {
  return `
  SELECT * 
  FROM posts 
  WHERE user_id = ${user.id}
  `;
};

export const fetchAllPostsHelper = () => {
  return `
  SELECT * 
  FROM posts 
  `;
};

export const fetchSinglePostsHelper = ({ post_id }) => {
  return `
  SELECT * 
  FROM posts 
  WHERE P.post_id = ${post_id}
  `;
};

export const addPostsHelper = ({
  post_title,
  post_description,
  post_condition,
  post_location,
  post_demand,
  post_status
}) => {
  return `
   INSERT INTO posts (title, description, condition, location, demand, status)
   VALUES (${post_title}, ${post_description}, ${post_condition}, ${post_location}, ${post_demand}, ${post_status})
   RETURNING *
  `;
};
