export const signUpHelper = () => `
    INSERT INTO users (email, username, password, location, photo_url, rep, rep_count, follower_count, following_count)
    VALUES ($1, $2, $3, '', 'http://laoblogger.com/images/default-profile-picture-5.jpg', 0, 0, 0, 0)
    RETURNING id, email, username
  `;

export const loginHelper = () => `
    SELECT * FROM users
    WHERE users.username=$1
  `;

// export const signUpHelper = ({ email, username, password }) => `
//     INSERT INTO users (email, username, password, location, photo_url, rep, rep_count, follower_count, following_count)
//     VALUES ('${email}', '${username}', '${password}', '', 'http://laoblogger.com/images/default-profile-picture-5.jpg', 0, 0, 0, 0)
//     RETURNING id, email, username
//   `;

// export const loginHelper = ({ username }) => `
//     SELECT * FROM users
//     WHERE users.username='${username}'
//   `;
