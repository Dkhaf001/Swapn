export const getUserEmailHelper = username => `
 SELECT users.email 
 FROM users 
 WHERE users.username='${username}'
`;
