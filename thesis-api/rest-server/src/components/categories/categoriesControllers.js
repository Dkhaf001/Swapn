import { categorysQueryHelper } from "./categoriesQueries";

export const fetchCategorysController = async (req, res) => {
  let payload;
  payload = req.params
  try {
    const data = await categorysQueryHelper(payload)
    return res.status(200).send(data)
  } catch (err) {
    console.log(err)
  }
};

