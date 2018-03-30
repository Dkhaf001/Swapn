export const fetchAllCategorysHelper = ({ category_id }) => {
  return `
   SELECT * 
   FROM posts
   WHERE posts.category = ${category_id}
  `;
};

// SELECT *
//    FROM posts
//    INNER JOIN categorys ON posts.category = categorys.id
//    WHERE posts.category = ${category_id}
