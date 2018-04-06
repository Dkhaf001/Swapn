export const fetchAllCategorysHelper = () => `
  SELECT *
  FROM users
  INNER JOIN posts on posts.user_id = users.id
  WHERE posts.category = $1
 `;
