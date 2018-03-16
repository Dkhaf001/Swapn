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
  await dropCategoryTable();
  await dropFollowingTable();
  await dropPhotoTable();
  await dropRatingTable();
  await dropOfferTable();
  await dropWatchTable();
  await dropPostTable();
  await dropUserTable();
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
