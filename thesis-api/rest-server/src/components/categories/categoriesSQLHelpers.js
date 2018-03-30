export const fetchAllCategorysHelper = ({ category_id }) => `
   SELECT * 
   FROM posts
   WHERE posts.category = ${category_id}
  `;
