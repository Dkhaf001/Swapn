import {
  fetchAllPostsHelper,
  fetchUserPostsHelper,
  fetchSinglePostsHelper,
  addPostsHelper
} from './postsSQLHelpers.js';
import db from '../../config/database/index';

export const fetchUserPostsController = async (req, res) => {
  let payload;
  payload = req.params;
  try {
    const data = await fetchUserPostsHelper(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllPostsController = async (req, res) => {
  let payload;
  payload = req.params;
  try {
    const data = await fetchAllPostsHelper(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePostsController = async (req, res) => {
  let payload;
  payload = req.params;
  try {
    const data = await fetchSinglePostsHelper(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const addPostsController = async (req, res) => {
  let payload;
  payload = req.params;
  try {
    const data = await addPostsHelper(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
