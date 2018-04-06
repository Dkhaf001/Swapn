export const fetchAllPostsHelper = () => `
  SELECT posts.id, posts.title, posts.description, posts.condition, posts.location, posts.demand, posts.user_id, posts.status, posts.main_photo, posts.created_at, users.username, categorys.type, users.photo_url FROM posts
  INNER JOIN users on (posts.user_id=users.id) 
  INNER JOIN categorys on (posts.category=categorys.id)
  `;

export const fetchUserPostsHelper = () => `
  SELECT * 
  FROM categorys 
  INNER JOIN posts on (posts.category=categorys.id)
  WHERE user_id = $1
  `;

export const fetchSinglePostsHelper = () =>
  `
  SELECT *
  FROM users 
  INNER JOIN posts  ON  posts.user_id = users.id 
  WHERE posts.id=$1
  `;
// SELECT * FROM posts INNER JOIN users
// post.id is overwriten by users.id when inner JOiNIng second table

export const addPostsHelper = () => `
   INSERT INTO posts (title, description, condition, location, category, demand, user_id, status, main_photo)
   VALUES ($2, $3, $4, $5, $6, $7, $1, $8, '')
   RETURNING *
  `;

export const deletePostsHelper = () => `
    DELETE FROM posts
    WHERE id=$2 AND user_id=$1
  `;

export const updatePostsHelper = () => `
   UPDATE posts 
   SET  title=$3, 
        description=$4, 
        condition=$5, 
        location=$6, 
        demand=$7, 
        status=$8,
        user_id=$1,
        main_photo=$9,
        tradingWith=$10
   WHERE id=$2
   RETURNING *
  `;

export const increaseWCountHelper = () => `
     UPDATE posts 
     SET  watch_count = watch_count + 1
     WHERE id=$1
     RETURNING *
    `;

export const decreaseWCountHelper = () => `
       UPDATE posts 
       SET  watch_count = watch_count - 1
       WHERE id=$1
       RETURNING *
      `;
