export const fetchCategorysHelper = ({ type }) => {
  return `
   SELECT * 
   FROM posts 
   INNER JOIN categorys
   ON posts.id = categorys.post_id 
   WHERE categorys.type = ${type}
  `;
};
