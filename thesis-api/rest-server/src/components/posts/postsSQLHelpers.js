export const fetchAllPostsHelper = () => `
  SELECT posts.id, posts.title, posts.description, posts.condition, posts.location, posts.demand, posts.user_id, posts.status, posts.main_photo, posts.created_at, users.username, categorys.type, users.photo_url FROM posts
  INNER JOIN users on (posts.user_id=users.id) 
  INNER JOIN categorys on (posts.category=categorys.id)
  `;

// SELECT posts.id, posts.title, posts.description, posts.condition, posts.location, posts.demand, posts.user_id, posts.status, posts.main_photo, posts.created_at, users.username, categorys.type FROM posts
// INNER JOIN users on (posts.user_id=users.id)
// INNER JOIN categorys on (posts.category=categorys.id)

export const fetchUserPostsHelper = ({ user_id }) => `
  SELECT * 
  FROM categorys 
  INNER JOIN posts on (posts.category=categorys.id)
  WHERE user_id = ${user_id}
  `;

export const fetchSinglePostsHelper = ({ post_id }) =>
  `
  SELECT *
  FROM users 
  INNER JOIN posts  ON  posts.user_id = users.id 
  WHERE posts.id=${post_id}
  `;
// SELECT * FROM posts INNER JOIN users
// post.id is overwriten by users.id when inner JOiNIng second table

export const addPostsHelper = (
  { user_id },
  { title, description, condition, location, category, demand, status }
) => `
   INSERT INTO posts (title, description, condition, location, category, demand, user_id, status, main_photo)
   VALUES ('${title}', '${description}', '${condition}', '${location}', ${category}, '${demand}', ${user_id}, '${status}', '')
   RETURNING *
  `;

export const deletePostsHelper = ({ user_id, post_id }) => `
    DELETE FROM posts
    WHERE id=${post_id} AND user_id=${user_id}
  `;

export const updatePostsHelper = (
  { user_id, post_id },
  {
    title,
    description,
    condition,
    location,
    demand,
    status,
    main_photo,
    tradingWith
  }
) => `
   UPDATE posts 
   SET  title='${title}', 
        description='${description}', 
        condition='${condition}', 
        location='${location}', 
        demand='${demand}', 
        status='${status}',
        user_id=${user_id},
        main_photo='${main_photo}',
        tradingWith='${tradingWith}'
   WHERE id=${post_id}
   RETURNING *
  `;

export const increaseWCountHelper = ({ post_id }) => `
     UPDATE posts 
     SET  watch_count = watch_count + 1
     WHERE id=${post_id}
     RETURNING *
    `;

export const decreaseWCountHelper = ({ post_id }) => `
       UPDATE posts 
       SET  watch_count = watch_count - 1
       WHERE id=${post_id}
       RETURNING *
      `;
