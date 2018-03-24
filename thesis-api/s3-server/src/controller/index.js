import {fetchAlbumQuery,addAlbumQuery,removeAlbumQuery,addPhotoQuery,removePhotoQuery} from
export const fetchAlbumController = async (req, res) => {
  // const payload = req.params;
  try {
    const data = await fetchAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const addAlbumController = async (req, res) => {
  // const payload = req.params;
  try {
    const data = await addAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const removeAlbumController = async (req, res) => {
  // const payload = req.params;
  try {
    const data = await removeAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const addPhotoController = async (req, res) => {
  // const payload = req.params;
  try {
    const data = await addPhotoQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const removePhotoController = async (req, res) => {
  // const payload = req.params;
  try {
    const data = await removePhotoQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
