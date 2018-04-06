export const getUserEmailHelper = () => `
 SELECT users.email 
 FROM users 
 WHERE users.username=$1
`;
