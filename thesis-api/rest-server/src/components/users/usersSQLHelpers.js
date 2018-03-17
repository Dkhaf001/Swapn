export const fetchUserHelper = ({ user_id }) => {
  return `
    SELECT u.email, u.username, u.location, u.photo_url, u.rep, u.rep_count, u.follower_count, u.following_count from users AS u
    WHERE id=${user_id}
  `;
};

export const updateUserHelper = ({ user_id, photo_url, location }) => {
  return `
    UPDATE users
    SET photo_url='${photo_url}',
        location='${location}'
    WHERE id=${user_id}
    RETURNING *
  `;
};