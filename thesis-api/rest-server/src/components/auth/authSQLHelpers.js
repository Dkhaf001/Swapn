export const signUpHelper = ({ email, username, password }) => {
  return `
    INSERT INTO users (email, username, password, clout, kills, deaths)
    VALUES ('${email}', '${username}', '${password}', 0, 0, 0)
    RETURNING id, email
  `;
};

export const loginHelper = ({ username }) => {
  return `
    SELECT * users
    WHERE users.username='${username}'
  `;
};
