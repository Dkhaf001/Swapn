export const fetchUserHelper = () =>
  `
    SELECT u.id, u.email, u.username, u.location, u.photo_url, u.rep, u.rep_count, u.follower_count, u.following_count from users AS u
    WHERE u.id=$1
  `;
export const updateUserHelper = () => `
    UPDATE users
    SET location=$2
    WHERE id=$1
    RETURNING *
  `;

export const updateProfilePicHelper = () => `
    UPDATE users
    SET photo_url=$2
    WHERE id=$1
    RETURNING *
  `;
