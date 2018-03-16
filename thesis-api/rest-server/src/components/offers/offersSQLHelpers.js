export const fetchOffersHelper = ({ user }) => {
  return `
  SELECT * 
  FROM posts 
  INNER JOIN offers
  ON posts.id = offers.post_id 
  WHERE offers.type = ${user}
  `;
};

