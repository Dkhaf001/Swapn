import { fetchAllCategorysQuery } from "./categoriesQueries";

export const fetchAllCategorysController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllCategorysQuery(payload)
    return res.status(200).send(data)
  } catch (err) {
    console.log(err)
  }
};

