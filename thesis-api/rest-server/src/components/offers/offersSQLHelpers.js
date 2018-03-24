export const fetchAllOffersHelper = ({ username }) => {
  return `
  SELECT * 
  FROM posts 
  INNER JOIN offers
  ON posts.id = offers.post_id 
  WHERE offers.buyer_username='${username}'
  `;
};

export const addOffersHelper = ({ post_id, buyer_username }) => {
  return `
  INSERT INTO offers (buyer_username, post_id)
  VALUES ('${buyer_username}', ${post_id})
  RETURNING id, buyer_username, post_id
  `;
};

export const removeOffersHelper = ({ post_id, user_id }) => {
  return `
  DELETE FROM offers
  WHERE post_id=${post_id} AND buyer_username='${user_id}'
  `;
};
