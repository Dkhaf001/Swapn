export const fetchAllOffersHelper = ({ user_id }) => {
  return `
  SELECT * 
  FROM posts 
  INNER JOIN offers
  ON posts.id = offers.post_id 
  WHERE offers.buyer_username=${user_id}
  `;
};

export const removeOffersHelper = ({ post_id, user_id }) => {
  return `
  DELETE FROM offers
  WHERE post_id=${post_id} AND buyer_username=${user_id}
  `;
};
