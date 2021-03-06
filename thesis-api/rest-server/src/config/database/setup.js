import {
  createUserTable,
  createPostTable,
  createWatchTable,
  createRatingTable,
  createPhotoTable,
  createFollowingTable,
  createCategoryTable,
  createOfferTable,
  dropUserTable,
  dropPostTable,
  dropWatchTable,
  dropRatingTable,
  dropPhotoTable,
  dropFollowingTable,
  dropCategoryTable,
  dropOfferTable
} from '../../lib/SQL';

const setup = async () => {
  await dropPhotoTable();
  await dropRatingTable();
  await dropOfferTable();
  await dropWatchTable();
  await dropFollowingTable();
  await dropPostTable();
  await dropCategoryTable();
  await dropUserTable();
  await createUserTable();
  await createCategoryTable();
  await createPostTable();
  await createFollowingTable();
  await createWatchTable();
  await createRatingTable();
  await createPhotoTable();
  await createOfferTable();
  process.exit();
};

setup();
