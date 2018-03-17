import db from '../../config/database';
import {
  fetchPostsHelper,
  fetchAllPostsHelper,
  fetchSinglePostHelper,
  addPostsHelper
} from './postsSQLHelpers';

export const fetchPostsQueryHelper = async (req, res) => {
  try {
    const queryString = fetchPostsHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchPostsQueryHelper - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllPostsQueryHelper = async (req, res) => {
  try {
    const queryString = fetchAllPostsHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllPostsQueryHelper - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchSinglePostsQueryHelper = async (req, res) => {
  try {
    const queryString = fetchSinglePostsHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log(
      'fetchSinglePostsQueryHelper - successfully retrieved data',
      data
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addPostsQueryHelper = async (req, res) => {
  try {
    const queryString = addPostsHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('addPostsQueryHelper - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
