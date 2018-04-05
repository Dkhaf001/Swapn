export const fetchAllCategorysHelper = ({ category_id }) => `
  SELECT *
  FROM users
  INNER JOIN posts on posts.user_id = users.id
  WHERE posts.category = ${category_id}
 `;
