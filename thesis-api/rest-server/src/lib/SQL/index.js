require('dotenv').config();

import db from '../../config/database/index';

const database = process.env || 'barter';

export const createUserTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(18) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      reputation INT,
      follower_count INT,
      following_count INT
      )
      `
    );
    console.log('successfully created users table');
  } catch (err) {
    console.log('error creating users table ', err);
  }
};

export const dropUserTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS users`);
    console.log('successfully dropped users table');
  } catch (err) {
    console.log('error dropping users table ', err);
  }
};

export const createPostTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS posts
      (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      condition VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      demand VARCHAR(255) NOT NULL,
      user_id INT REFERENCES users(id),
      watch_count INT NOT NULL,
      view_count INT NOT NULL,
      offer_count INT NOT NULL,
      status VARCHAR(255) NOT NULL
      )
      `
    );
    console.log('successfully created users table');
  } catch (err) {
    console.log('error creating users table ', err);
  }
};

export const dropPostTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS posts`);
    console.log('successfully dropped posts table');
  } catch (err) {
    console.log('error dropping users table ', err);
  }
};

export const createWatchTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS watchs
      (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      post_id INT REFERENCES posts(id)
      )
      `
    );
    console.log('successfully created watchs table');
  } catch (err) {
    console.log('error creating watchs table ', err);
  }
};

export const dropWatchTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS watchs`);
    console.log('successfully dropped watchs table');
  } catch (err) {
    console.log('error dropping watchs table ', err);
  }
};

export const createRatingTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS ratings
      (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      rating INT NOT NULL
      )
      `
    );
    console.log('successfully created ratings table');
  } catch (err) {
    console.log('error creating ratings table ', err);
  }
};

export const dropRatingTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS ratings`);
    console.log('successfully dropped ratings table');
  } catch (err) {
    console.log('error dropping ratings table ', err);
  }
};

export const createPhotoTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS photos
      (
      id SERIAL PRIMARY KEY,
      post_id INT REFERENCES posts(id),
      url VARCHAR(255) NOT NULL
      )
      `
    );
    console.log('successfully created photos table');
  } catch (err) {
    console.log('error creating photos table ', err);
  }
};

export const dropPhotoTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS photos`);
    console.log('successfully dropped photos table');
  } catch (err) {
    console.log('error dropping photos table ', err);
  }
};

export const createFollowingTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS followings
      (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      follower_id INT NOT NULL
      )
      `
    );
    console.log('successfully created followings table');
  } catch (err) {
    console.log('error creating followings table ', err);
  }
};

export const dropFollowingTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS followings`);
    console.log('successfully dropped followings table');
  } catch (err) {
    console.log('error dropping followings table ', err);
  }
};

export const createCategoryTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS categorys
      (
      id SERIAL PRIMARY KEY,
      type VARCHAR(255) NOT NULL,
      post_id INT REFERENCES posts(id)
      )
      `
    );
    console.log('successfully created categorys table');
  } catch (err) {
    console.log('error creating categorys table ', err);
  }
};

export const dropCategoryTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS categorys`);
    console.log('successfully dropped categorys table');
  } catch (err) {
    console.log('error dropping categorys table ', err);
  }
};

export const createOfferTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS offers
      (
        id SERIAL PRIMARY KEY,
        buyer_username VARCHAR(18) NOT NULL,
        post_id INT REFERENCES posts(id)
      )
      `
    );
    console.log('successfully created offers table');
  } catch (err) {
    console.log('error creating offers table ', err);
  }
};

export const dropOfferTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS offers`);
    console.log('successfully dropped offers table');
  } catch (err) {
    console.log('error dropping offers table ', err);
  }
};
