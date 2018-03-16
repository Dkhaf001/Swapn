require('dotenv').config();

import db from '../../config/database';

const database = process.env || 'barter' ;

//create databases export
export const createDatabase = async () => {
  try {
   await db.queryAsync(
     `CREATE DATABASE ${database}`
    );
    console.log('successfully created database', database);
  } catch (err) {
    console.log('error creating database', err);
  }
};


export const dropDatabase = async () => {
  try {
    await db.queryAsync(
      `DROP DATABASE IF EXISTS ${database}`
    );
    console.log('successfully dropped database ', database);
  } catch (err) {
    console.log('error dropping database ', err);
  }
};

export const useDatabase = async () => {
  try {
    await db.queryAsync(
      `USE IF EXISTS ${database}`
    );
    console.log('successfully using database ', database);
  } catch (err) {
    console.log('error using database ', err);
  }
};

export const createUserTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL,
      email VARCHAR NULL DEFAULT NULL,
      username VARCHAR(18) NULL DEFAULT NULL,
      password VARCHAR NULL DEFAULT NULL,
      location VARCHAR NULL DEFAULT NULL,
      reputation INTEGER NULL DEFAULT NULL,
      follower_count INTEGER NULL DEFAULT NULL,
      following_count INTEGER NULL DEFAULT NULL,
      PRIMARY KEY (id)
      )
      `
    );
    console.log('successfully created users table');
  } catch (err) {
    console.log('error creating users table ', err)
  }
};

export const dropUserTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS users`
    );
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
      id SERIAL,
      title VARCHAR NULL DEFAULT NULL,
      description VARCHAR NULL DEFAULT NULL,
      condition VARCHAR NULL DEFAULT NULL,
      location VARCHAR NULL DEFAULT NULL,
      demand VARCHAR NULL DEFAULT NULL,
      user_id INTEGER NULL DEFAULT NULL,
      watch_count INTEGER NULL DEFAULT NULL,
      view_count INTEGER NULL DEFAULT NULL,
      offer_count INTEGER NULL DEFAULT NULL,
      status VARCHAR NULL DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_posts_user_id
      FOREIGN KEY(user_id) REFERENCES users(id),
      )
      `
    );
    console.log('successfully created users table');
  } catch (err) {
    console.log('error creating users table ', err)
  }
};

export const dropPostTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS posts`
    );
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
      id SERIAL,
      user_id INTEGER NULL DEFAULT NULL,
      post_id INTEGER NULL DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_watchs_user_id
      FOREIGN KEY(user_id) REFERENCES users(id),
      CONSTRAINT fk_watchs_post_id
      FOREIGN KEY(post_id) REFERENCES posts(id),
      )
      `
    );
    console.log('successfully created watchs table');
  } catch (err) {
    console.log('error creating watchs table ', err)
  }
};

export const dropWatchTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS watchs`
    );
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
      id SERIAL,
      user_id INTEGER NULL DEFAULT NULL,
      rating INTEGER NULL DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_ratings_user_id
      FOREIGN KEY(user_id) REFERENCES users(id)
      )
      `
    );
    console.log('successfully created ratings table');
  } catch (err) {
    console.log('error creating ratings table ', err)
  }
};

export const dropRatingTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS watchs`
    );
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
      id SERIAL,
      post_id INTEGER NULL DEFAULT NULL,
      url VARCHAR NULL DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_photos_post_id
      FOREIGN KEY(post_id) REFERENCES posts(id),
      )
      `
    );
    console.log('successfully created photos table');
  } catch (err) {
    console.log('error creating photos table ', err)
  }
};

export const dropPhotoTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS photos`
    );
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
      id SERIAL,
      user_id INTEGER NULL DEFAULT NULL,
      follower_id INTEGER NULL DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_followings_user_id
      FOREIGN KEY(user_id) REFERENCES users(id),
      )
      `
    );
    console.log('successfully created followings table');
  } catch (err) {
    console.log('error creating followings table ', err)
  }
};

export const dropFollowingTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS followings`
    );
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
      id SERIAL,
      type VARCHAR NULL DEFAULT NULL,
      post_id INTEGER NULL DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_categorys_post_id
      FOREIGN KEY(post_id) REFERENCES posts(id),
      )
      `
    );
    console.log('successfully created categorys table');
  } catch (err) {
    console.log('error creating categorys table ', err)
  }
};

export const dropCategoryTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS categorys`
    );
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
        id SERIAL,
        buyer_username VARCHAR NULL DEFAULT NULL,
        post_id INTEGER NULL DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_offers_post_id
        FOREIGN KEY(post_id) REFERENCES posts(id),
      )
      `
    );
    console.log('successfully created offers table');
  } catch (err) {
    console.log('error creating offers table ', err)
  }
};

export const dropOfferTable = async () => {
  try {
    await db.queryAsync(
      `DROP TABLE IF EXISTS offers`
    );
    console.log('successfully dropped offers table');
  } catch (err) {
    console.log('error dropping offers table ', err);
  }
};