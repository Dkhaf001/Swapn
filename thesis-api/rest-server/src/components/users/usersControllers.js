import { fetchUserQuery, updateUserQuery } from './usersQueries';

export const fetchUserController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchUserQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserController = async (req, res) => {
  let payload = req.body;
  try {
    const data = await updateUserQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};
