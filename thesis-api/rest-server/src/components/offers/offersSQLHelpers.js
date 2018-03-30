export const fetchAllOffersHelper = ({ username }) => `
  SELECT * 
  FROM posts 
  INNER JOIN offers
  ON posts.id = offers.post_id 
  WHERE offers.buyer_username='${username}'
  `;

export const addOffersHelper = ({ post_id, buyer_username, room_id }) => `
  INSERT INTO offers (buyer_username, post_id, room_id)
  VALUES ('${buyer_username}', ${post_id}, '${room_id}')
  RETURNING id, buyer_username, post_id, room_id
  `;

export const removeOffersHelper = ({ post_id, user_id }) => `
  DELETE FROM offers
  WHERE post_id=${post_id} AND buyer_username='${user_id}'
  `;

export const getSingleOfferHelper = ({ buyer_username, post_id }) => `
  SELECT * 
  FROM offers 
  WHERE offers.buyer_username='${buyer_username}' AND offers.post_id=${post_id}
  `;

export const fetchPostOffersHelper = ({ post_id }) => `
  SELECT *
  FROM offers AS o
  INNER JOIN users AS u ON u.username=o.buyer_username WHERE o.post_id=${post_id}
  `;
