export const signUpHelper = ({ email, username, password }) => {
  return `
    INSERT INTO users (email, username, password, location, photo_url, reputation, follower_count, following_count)
    VALUES ('${email}', '${username}', '${password}', '', '', 0, 0, 0)
    RETURNING id, email
  `;
};

export const loginHelper = ({ username }) => {
  return `
    SELECT * FROM users
    WHERE users.username='${username}'
  `;
};
