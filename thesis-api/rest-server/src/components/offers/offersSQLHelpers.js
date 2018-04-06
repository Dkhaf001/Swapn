export const fetchAllOffersHelper = () => `
  SELECT * 
  FROM posts 
  INNER JOIN offers
  ON posts.id = offers.post_id 
  WHERE offers.buyer_username=$1
  `;

export const addOffersHelper = () => `
  INSERT INTO offers (buyer_username, post_id, room_id)
  VALUES ($2, $1, $3)
  RETURNING id, buyer_username, post_id, room_id
  `;

export const removeOffersHelper = () => `
  DELETE FROM offers
 WHERE buyer_username=$1 AND post_id=$2
  `;

export const getSingleOfferHelper = () => `
  SELECT * 
  FROM offers 
  WHERE offers.buyer_username=$1 AND offers.post_id=$2
  `;

export const fetchPostOffersHelper = () => `
  SELECT *
  FROM offers AS o
  INNER JOIN users AS u ON u.username=o.buyer_username WHERE o.post_id=$1
  `;

// export const fetchAllOffersHelper = ({ username }) => `
//   SELECT *
//   FROM posts
//   INNER JOIN offers
//   ON posts.id = offers.post_id
//   WHERE offers.buyer_username='${username}'
//   `;

// export const addOffersHelper = ({ post_id, buyer_username, room_id }) => `
//   INSERT INTO offers (buyer_username, post_id, room_id)
//   VALUES ('${buyer_username}', ${post_id}, '${room_id}')
//   RETURNING id, buyer_username, post_id, room_id
//   `;

// export const removeOffersHelper = ({ buyer_username, post_id }) => `
//   DELETE FROM offers
//  WHERE buyer_username='${buyer_username}' AND post_id=${post_id}
//   `;

// export const getSingleOfferHelper = ({ buyer_username, post_id }) => `
//   SELECT *
//   FROM offers
//   WHERE offers.buyer_username='${buyer_username}' AND offers.post_id=${post_id}
//   `;

// export const fetchPostOffersHelper = ({ post_id }) => `
//   SELECT *
//   FROM offers AS o
//   INNER JOIN users AS u ON u.username=o.buyer_username WHERE o.post_id=${post_id}
//   `;
