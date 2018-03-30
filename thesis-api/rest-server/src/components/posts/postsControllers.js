import {
  fetchAllPostsQuery,
  fetchUserPostsQuery,
  fetchSinglePostsQuery,
  updatePostsQuery,
  deletePostsQuery,
  addPostsQuery,
} from './postsQueries';

export const fetchAllPostsController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchAllPostsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserPostsController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchUserPostsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePostsController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchSinglePostsQuery(payload);
    data[0].password = 'N/A';
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const updatePostsController = async (req, res) => {
  const payload = req.body;
  const user = req.params;
  try {
    const data = await updatePostsQuery(user, payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const deletePostsController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await deletePostsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const addPostsController = async (req, res) => {
  const payload = req.body;
  const user = req.params;
  try {
    const data = await addPostsQuery(user, payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
