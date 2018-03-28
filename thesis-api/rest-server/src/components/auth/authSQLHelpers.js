export const signUpHelper = ({ email, username, password }) => `
    INSERT INTO users (email, username, password, location, photo_url, rep, rep_count, follower_count, following_count)
    VALUES ('${email}', '${username}', '${password}', '', '', 0, 0, 0, 0)
    RETURNING id, email, username
  `;

export const loginHelper = ({ username }) => `
    SELECT * FROM users
    WHERE users.username='${username}'
  `;
