import {
  createDatabase,
  createUserTable,
  createPostTable,
  createWatchTable,
  createRatingTable,
  createPhotoTable,
  createFollowingTable,
  createCategoryTable,
  createOfferTable,
  dropDatabase,
  dropUserTable,
  dropPostTable,
  dropWatchTable,
  dropRatingTable,
  dropPhotoTable,
  dropFollowingTable,
  dropCategoryTable,
  dropOfferTable,
  useDatabase
} from '../../lib/SQL';

const setup = async () => {
  await dropDatabase();
  await dropCategoryTable();
  await dropFollowingTable();
  await dropPhotoTable();
  await dropRatingTable();
  await dropOfferTable();
  await dropWatchTable();
  await dropPostTable();
  await dropUserTable();
  await createDatabase();
  await createUserTable();
  await createPostTable();
  await createWatchTable();
  await createRatingTable();
  await createPhotoTable();
  await createFollowingTable();
  await createCategoryTable();
  await createOfferTable();
  process.exit();
};

setup();
