import db from '../../config/database';

import {
  fetchUserPostsHelper,
  fetchAllPostsHelper,
  fetchSinglePostsHelper,
  updatePostsHelper,
  deletePostsHelper,
  addPostsHelper
} from './postsSQLHelpers';

export const fetchAllPostsQuery = async payload => {
  try {
    const queryString = fetchAllPostsHelper(payload);
    const data = await db.queryAsync(queryString);
    // console.log('fetchAllPostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserPostsQuery = async payload => {
  try {
    const queryString = fetchUserPostsHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchUserPostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePostsQuery = async (user, payload) => {
  try {
    const queryString = fetchSinglePostsHelper(user, payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchSinglePostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const addPostsQuery = async (user, payload) => {
  try {
    const queryString = addPostsHelper(user, payload);
    const data = await db.queryAsync(queryString);
    console.log('addPostsQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePostsQuery = async (user, payload) => {
  try {
    const queryString = deletePostsHelper(user, payload);
    const data = await db.queryAsync(queryString);
    console.log('deletePostsQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePostsQuery = async (user, payload) => {
  try {
    const queryString = updatePostsHelper(user, payload);
    const data = await db.queryAsync(queryString);
    console.log('updatePostsQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};
