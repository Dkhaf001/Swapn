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
    await createDatabase();
    await createUserTable();
    await createPostTable();
    await createWatchTable();
    await createRatingTable();
    await createPhotoTable();
    await createFollowingTable();
    await createCategoryTable();
    await createOfferTable();
    await dropDatabase();
    await dropUserTable();
    await dropPostTable();
    await dropWatchTable();
    await dropRatingTable();
    await dropPhotoTable();
    await dropFollowingTable();
    await dropCategoryTable();
    await dropOfferTable();
    process.exit();
}

setup()