import {
  fetchAllPostsQuery,
  fetchUserPostsQuery,
  fetchSinglePostsQuery,
  updatePostsQuery,
  deletePostsQuery,
  addPostsQuery
} from './postsQueries';

export const fetchAllPostsController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllPostsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserPostsController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchUserPostsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePostsController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchSinglePostsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const updatePostsController = async (req, res) => {
  let payload = req.body;
  let user = req.params;
  try {
    const data = await updatePostsQuery(user, payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const deletePostsController = async (req, res) => {
  let payload = req.body;
  let user = req.params;
  try {
    const data = await deletePostsQuery(user, payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const addPostsController = async (req, res) => {
  let payload = req.body;
  let user = req.params;
  try {
    const data = await addPostsQuery(user, payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
